
import { db } from "@/lib/prisma";
import { inngest } from "./client";
import { Prisma } from "@prisma/client"; //  Decimal support
import { sendEmail } from "@/actions/send-email";
import EmailTemplate from "@/emails/template";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { subMonths, startOfMonth, endOfMonth } from "date-fns";

const toNumber = (value) => {
  if (typeof value === "number") return value;
  if (Prisma.Decimal.isDecimal(value)) return value.toNumber();
  return parseFloat(value);
};

//  Fixed to safely handle Date or string
function isNewMonth(lastAlertDate, currentDate) {
  if (!lastAlertDate) return true;

  const last = new Date(lastAlertDate); // Always treat it as a Date
  return (
    last.getMonth() !== currentDate.getMonth() ||
    last.getFullYear() !== currentDate.getFullYear()
  );
}

export const checkBudgetAlerts = inngest.createFunction(
  { name: "Check Budget Alerts" },
  { cron: "0 */6 * * *" }, // Every 6 hours
  async ({ step }) => {
    const budgets = await step.run("fetch-budgets", async () => {
      return await db.budget.findMany({
        where: {
          account: {
            isDefault: true,
          },
        },
        include: {
          account: {
            include: {
              user: true,
            },
          },
        },
      });
    });

    for (const budget of budgets) {
      const account = budget.account;
      // const user = account.user;

      await step.run(`check-budget-${budget.id}`, async () => {
        const now = new Date();
        const startDate = new Date(now.getFullYear(), now.getMonth(), 1);

        const expenses = await db.transaction.aggregate({
          where: {
            accountId: account.id,
            userId: account.userId,
            type: "EXPENSE",
            date: { gte: startDate },
          },
          _sum: {
            amount: true,
          },
        });

        const totalExpenses = toNumber(expenses._sum.amount);
        const budgetAmount = toNumber(budget.amount);
        const percentageUsed = (totalExpenses / budgetAmount) * 100;

        if (
          percentageUsed >= 80 &&
          isNewMonth(budget.lastAlertSent, now)
        ) {

          //send email

          await sendEmail({
          to: account.user.email,
          subject: `Budget Alert for ${account.name}`,
           react: EmailTemplate({
            userName: account.user.name,
              type: "budget-alert",
              data: {
                percentageUsed,
                budgetAmount: parseInt(budgetAmount).toFixed(1),
                totalExpenses: parseInt(totalExpenses).toFixed(1),
                accountName: account.name,
              },
            }),
          })

          //update lastAlert
          await db.budget.update({
            where: { id: budget.id },
            data: { lastAlertSent: now },
          });

        }
      });
    }

    return { success: true };
  }
);

// Trigger recurring transactions with batching
export const triggerRecurringTransactions = inngest.createFunction(
  {
    id: "trigger-recurring-transactions", // Unique ID,
    name: "Trigger Recurring Transactions",
  },
  { cron: "0 0 * * *" }, // Daily at midnight
  async ({ step }) => {
    const recurringTransactions = await step.run(
      "fetch-recurring-transactions",
      async () => {
        return await db.transaction.findMany({
          where: {
            isRecurring: true,
            status: "COMPLETED",
            OR: [
              { lastProcessed: null },
              {
                nextRecurringDate: {
                  lte: new Date(),
                },
              },
            ],
          },
        });
      }
    );

    // create event for each recurring transaction in batches
    if (recurringTransactions.length > 0) {
      const events = recurringTransactions.map((transaction) => ({
        name: "transaction.recurring.process",
        data: {
          transactionId: transaction.id,
          userId: transaction.userId,
        },
      }));

      // Send events directly using inngest.send()
      await inngest.send(events);
    }

    return { triggered: recurringTransactions.length };
  }
);

// 1. Recurring Transaction Processing with Throttling
export const processRecurringTransaction = inngest.createFunction(
  {
    id: "process-recurring-transaction",
    name: "Process Recurring Transaction",
    throttle: {
      limit: 15, // Process 15 transactions
      period: "1m", // per minute
      key: "event.data.userId", // Throttle per user
    },
  },
  { event: "transaction.recurring.process" },
  async ({ event, step }) => {
    // Validate event data
    if (!event?.data?.transactionId || !event?.data?.userId) {
      console.error("Invalid event data:", event);
      return { error: "Missing required event data" };
    }

    await step.run("process-transaction", async () => {
      const transaction = await db.transaction.findUnique({
        where: {
          id: event.data.transactionId,
          userId: event.data.userId,
        },
        include: {
          account: true,
        },
      });

      if (!transaction || !isTransactionDue(transaction)) return;

      // Create new transaction and update account balance in a transaction
      await db.$transaction(async (tx) => {
        // Create new transaction
        await tx.transaction.create({
          data: {
            type: transaction.type,
            amount: transaction.amount,
            description: `${transaction.description} (Recurring)`,
            date: new Date(),
            category: transaction.category,
            userId: transaction.userId,
            accountId: transaction.accountId,
            isRecurring: false,
          },
        });

        // Update account balance
        const balanceChange =
          transaction.type === "EXPENSE"
            ? -transaction.amount.toNumber()
            : transaction.amount.toNumber();

        await tx.account.update({
          where: { id: transaction.accountId },
          data: { balance: { increment: balanceChange } },
        });

        // Update last processed date and next recurring date
        await tx.transaction.update({
          where: { id: transaction.id },
          data: {
            lastProcessed: new Date(),
            nextRecurringDate: calculateNextRecurringDate(
              new Date(),
              transaction.recurringInterval
            ),
          },
        });
      });
    });
  }
);

// Utility functions
function isTransactionDue(transaction) {
  // If no lastProcessed date, transaction is due
  if (!transaction.lastProcessed) return true;

  const today = new Date();
  const nextDue = new Date(transaction.nextRecurringDate);

  // Compare with nextDue date
  return nextDue <= today;
}

// Helper function to calculate next recurring date
function calculateNextRecurringDate(startDate, interval) {
  const date = new Date(startDate);

  switch (interval) {
    case "DAILY":
      date.setDate(date.getDate() + 1);
      break;
    case "WEEKLY":
      date.setDate(date.getDate() + 7);
      break;
    case "MONTHLY":
      const originalDate = date.getDate();
      date.setMonth(date.getMonth() + 1);

      // Fix if date overflows (e.g., Feb 30 → Mar 2)
      if (date.getDate() < originalDate) {
        date.setDate(0); // sets to last day of previous month
      }
      break;
    case "YEARLY":
      date.setFullYear(date.getFullYear() + 1);
      break;
  }

  return date;
}

export const generateMonthlyReports = inngest.createFunction(
  {
    id: "generate-monthly-reports",
    name: "Generate Monthly Reports",
  },
  { cron: "0 0 1 * *" }, // First day of each month
  async ({ step }) => {
    const users = await step.run("fetch-users", async () => {
      return await db.user.findMany({
        include: { accounts: true },
      });
    });

    for (const user of users) {
      await step.run(`generate-report-${user.id}`, async () => {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        const stats = await getMonthlyStats(user.id, lastMonth);
        const monthName = lastMonth.toLocaleString("default", {
          month: "long",
        });

        
        // Generate AI insights
        const insights = await generateFinancialInsights(stats, monthName);

        await sendEmail({
          to: user.email,
          subject: `Your Monthly Financial Report - ${monthName}`,
          react: EmailTemplate({
            userName: user.name,
            type: "monthly-report",
            data: {
              stats,
              month: monthName,
              insights,
           },
          }),
        });
      });
    }

    return { processed: users.length };
  }
);


async function getMonthlyStats(userId, month) {
 const lastMonthStart = startOfMonth(subMonths(new Date(), 1)); // e.g. May 1
const lastMonthEnd = endOfMonth(subMonths(new Date(), 1));     // e.g. May 31
console.log({ lastMonthStart, lastMonthEnd });

  const transactions = await db.transaction.findMany({
    where: {
      userId,
      date: {
        gte: lastMonthStart,
        lte: lastMonthEnd,
      },
    },
  });

  return transactions.reduce(
    (stats, t) => {
      const amount = t.amount.toNumber();
      if (t.type === "EXPENSE") {
        stats.totalExpenses += amount;
        stats.byCategory[t.category] =
          (stats.byCategory[t.category] || 0) + amount;
      } else {
        stats.totalIncome += amount;
      }
      return stats;
    },
    {
      totalExpenses: 0,
      totalIncome: 0,
      byCategory: {},
      transactionCount: transactions.length,
    }
  );
}

async function generateFinancialInsights(stats, month) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const prompt = `
// You are a smart financial assistant analyzing a user's spending for the month of ${month}.

// Your job is to generate 3 friendly, personalized, and insightful tips based on their financial activity. 
// These insights should be practical and focused on helping them understand their habits and improve their financial decisions.

// Here is the financial summary:
// - Total Income: $${stats.totalIncome}
// - Total Expenses: $${stats.totalExpenses}
// - Net Savings: $${stats.totalIncome - stats.totalExpenses}
// - Breakdown by Category: ${Object.entries(stats.byCategory)
//   .map(([category, amount]) => `${category}: $${amount}`)
//   .join(", ")}

// Instructions:
// - Focus on meaningful patterns (e.g., overspending in one category, unusual savings, or a good income-to-expense ratio).
// - Use a warm, motivational tone (like a helpful coach).
// - Format the output as a JSON array of 3 strings.

// Example output:
// [
//   "You spent over 40% of your expenses on Dining — maybe time to explore more home cooking!",
//   "Great job keeping your savings positive this month! Consider allocating part of it toward your emergency fund.",
//   "Transport costs spiked this month — did something change in your commute? Worth reviewing next month."
// ]
// `;

const prompt = `
You are a smart and empathetic financial assistant analyzing a user's spending for the month of ${month}.

Your job is to generate 3 friendly, personalized, and insightful tips based on their financial activity.  These insights should be practical, actionable, and focused on helping them understand their spending habits and improve their financial decisions.  Provide specific recommendations, not just generic advice.

Here is the financial summary:
- Total Income: $${stats.totalIncome}
- Total Expenses: $${stats.totalExpenses}
- Net Savings: $${stats.totalIncome - stats.totalExpenses}
- Breakdown by Category: ${Object.entries(stats.byCategory)
  .map(([category, amount]) => `${category}: $${amount}`)
  .join(", ")}

Instructions:

1.  **Prioritize Meaningful Patterns:** Focus on significant trends and anomalies.  Examples include:
    *   Overspending in specific categories (identify the category).
    *   Unusually high savings (encourage further saving/investment).
    *   An excellent income-to-expense ratio (acknowledge their success and offer ways to optimize).
    *   Fluctuations compared to previous months (e.g., "Your Entertainment spending doubled compared to last month!").
    *   Unexpected expenses (e.g., "A significant amount was spent on 'Other'. Could you clarify these expenses for better tracking?").
    *   High fixed costs relative to income (offer suggestions for reducing them, like refinancing).
    *   Small/negative savings (recommend budget adjustments).

2.  **Offer Actionable Advice:**  Don't just state the problem; suggest a solution.  Examples:
    *   Instead of "You spent a lot on dining," say, "Dining accounted for $X, 35% of your expenses. Try packing lunch 2-3 times a week to save money."
    *   Instead of "You're saving a lot," say, "Excellent savings this month! Have you considered automating a regular transfer to your investment account?"
    *   Instead of "Transportation costs are high," say, "Transportation costs are $X. Explore options like carpooling, public transport, or biking to reduce this."

3.  **Provide Contextual Insights:** Relate spending to potential goals or long-term financial health.  Examples:
    *   "While your Entertainment spending is high, if it brings you joy and fits within your budget, that's okay! Just be mindful of your savings goals."
    *   "Your savings are below your target of $X per month.  Reducing spending in [Category] could help you reach your goal."
    *   "With your current savings rate, you're on track to reach your short-term goal of [goal] by [date].  Great job!"

4.  **Use a Warm, Motivational, and Empathetic Tone:**  Be a helpful coach, not a judgmental critic.  Use positive reinforcement where possible.

5.  **Acknowledge Successes:** If they're doing well in certain areas, point it out! This can boost motivation.

6.  **Formatting Requirements:**
    *   The output MUST be a JSON array of 3 strings.
    *   Each string should be a complete sentence or two.
    *   Be concise and avoid overly technical language.

Example output:
[
  "Dining expenses are $X, which is high. Trying meal prepping twice a week can save around $50-$80 a month!",
  "Fantastic job saving $X! Consider setting up an automated transfer to your savings or investment account to build your wealth faster.",
  "Your transportation costs increased by $Y this month. Check for potential issues with your vehicle or explore alternative routes to work."
]
`;
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error generating insights:", error);
    return [
      "Your highest expense category this month might need attention.",
      "Consider setting up a budget for better financial management.",
      "Track your recurring expenses to identify potential savings.",
    ];
  }
}
