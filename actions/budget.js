// "use server";

// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { revalidatePath } from "next/cache";

// export async function getCurrentBudget(accountId) {
//   try {
//     const { userId } = await auth();
//     if (!userId) throw new Error("Unauthorized");

//     const user = await db.user.findUnique({
//       where: { clerkUserId: userId },
//     });

//     if (!user) {
//       throw new Error("User not found");
//     }

//     const budget = await db.budget.findFirst({
//       where: {
//         userId: user.id,
//       },
//     });

//     // Get current month's expenses
//     const currentDate = new Date();
//     const startOfMonth = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       1
//     );
//     const endOfMonth = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() + 1,
//       0
//     );

//     const expenses = await db.transaction.aggregate({
//       where: {
//         userId: user.id,
//         type: "EXPENSE",
//         date: {
//           gte: startOfMonth,
//           lte: endOfMonth,
//         },
//         accountId,
//       },
//       _sum: {
//         amount: true,
//       },
//     });

//     return {
//       budget: budget ? { ...budget, amount: budget.amount.toNumber() } : null,
//       currentExpenses: expenses._sum.amount
//         ? expenses._sum.amount.toNumber()
//         : 0,
//     };
//   }
//    catch (error) {
//     console.error("Error fetching budget:", error);
//     throw error;
//   }
// }

// export async function updateBudget(amount) {
//   try {
//     const { userId } = await auth();
//     if (!userId) throw new Error("Unauthorized");

//     const user = await db.user.findUnique({
//       where: { clerkUserId: userId },
//     });

//     if (!user) throw new Error("User not found");

//     // Update or create budget
//     const budget = await db.budget.upsert({
//       where: {
//         userId: user.id,
//       },
//       update: {
//         amount,
//       },
//       create: {
//         userId: user.id,
//         amount,
//       },
//     });

    

//     revalidatePath("/dashboard");
//     return {
//       success: true,
//       data: { ...budget, amount: budget.amount.toNumber() },
//     };
//   } catch (error) {
//     console.error("Error updating budget:", error);
//     return { success: false, error: error.message };
//   }
// }

// "use server";

// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { revalidatePath } from "next/cache";

// // Convert Decimal to plain numbers
// function convertBudgetDecimals(budget) {
//   return {
//     ...budget,
//     amount: budget.amount.toNumber(),
//     daily: budget.daily ? budget.daily.toNumber() : null,
//   };
// }

// export async function getCurrentBudget(accountId) {
//   try {
//     const { userId } = await auth();
//     if (!userId) throw new Error("Unauthorized");

//     const account = await db.account.findFirst({
//       where: {
//         id: accountId,
//         user: {
//           clerkUserId: userId,
//         },
//       },
//     });

//     if (!account) throw new Error("Account not found");

//     const budget = await db.budget.findUnique({
//       where: { accountId },
//     });

//     const now = new Date();
//     const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//     const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

//     const startOfToday = new Date();
//     startOfToday.setHours(0, 0, 0, 0);

//     const endOfToday = new Date();
//     endOfToday.setHours(23, 59, 59, 999);

//     const monthlyExpenses = await db.transaction.aggregate({
//       where: {
//         accountId,
//         userId: account.userId,
//         type: "EXPENSE",
//         date: {
//           gte: startOfMonth,
//           lte: endOfMonth,
//         },
//       },
//       _sum: {
//         amount: true,
//       },
//     });

//     const todayExpenses = await db.transaction.aggregate({
//       where: {
//         accountId,
//         userId: account.userId,
//         type: "EXPENSE",
//         date: {
//           gte: startOfToday,
//           lte: endOfToday,
//         },
//       },
//       _sum: {
//         amount: true,
//       },
//     });

//     return {
//       budget: budget ? convertBudgetDecimals(budget) : null,
//       currentExpenses: monthlyExpenses._sum.amount ? monthlyExpenses._sum.amount.toNumber() : 0,
//       todayExpenses: todayExpenses._sum.amount ? todayExpenses._sum.amount.toNumber() : 0,
//     };
//   } catch (error) {
//     console.error("Error fetching budget:", error);
//     throw error;
//   }
// }

// export async function updateBudget(accountId, amount) {
//   try {
//     const { userId } = await auth();
//     if (!userId) throw new Error("Unauthorized");

//     const account = await db.account.findFirst({
//       where: {
//         id: accountId,
//         user: {
//           clerkUserId: userId,
//         },
//       },
//     });

//     if (!account) throw new Error("Account not found");

//     const daysInMonth = new Date(
//       new Date().getFullYear(),
//       new Date().getMonth() + 1,
//       0
//     ).getDate();

//     const budget = await db.budget.upsert({
//       where: { accountId },
//       update: {
//         amount,
//         daily: amount / daysInMonth,
//       },
//       create: {
//         accountId,
//         amount,
//         daily: amount / daysInMonth,
//       },
//     });

//     revalidatePath("/dashboard");

//     return {
//       success: true,
//       data: convertBudgetDecimals(budget),
//     };
//   } catch (error) {
//     console.error("Error updating budget:", error);
//     return { success: false, error: error.message };
//   }
// }

"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

//  Convert Prisma Decimal to plain number
function convertBudgetDecimals(budget) {
  return {
    ...budget,
    amount: budget.amount.toNumber(),
    daily: budget.daily ? budget.daily.toNumber() : null,
  };
}

//  Calculate dynamic daily budget
function calculateDynamicDailyBudget(totalSpent, monthlyBudget) {
  const today = new Date();
  const totalDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const currentDay = today.getDate();

  const daysRemaining = totalDays - currentDay + 1; // include today
  const remainingBudget = monthlyBudget - totalSpent;

  if (remainingBudget <= 0 || daysRemaining <= 0) return 0;

  return remainingBudget / daysRemaining;
}

//  Get current budget and expense info
export async function getCurrentBudget(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const account = await db.account.findFirst({
      where: {
        id: accountId,
        user: { clerkUserId: userId },
      },
    });

    if (!account) throw new Error("Account not found");

    const budget = await db.budget.findUnique({
      where: { accountId },
    });

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const monthlyExpenses = await db.transaction.aggregate({
      where: {
        accountId,
        userId: account.userId,
        type: "EXPENSE",
        date: { gte: startOfMonth, lte: endOfMonth },
      },
      _sum: { amount: true },
    });

    const todayExpenses = await db.transaction.aggregate({
      where: {
        accountId,
        userId: account.userId,
        type: "EXPENSE",
        date: { gte: startOfToday, lte: endOfToday },
      },
      _sum: { amount: true },
    });

    const totalSpent = monthlyExpenses._sum.amount?.toNumber() || 0;
    const todaySpent = todayExpenses._sum.amount?.toNumber() || 0;
    const dynamicDailyBudget = budget
      ? calculateDynamicDailyBudget(totalSpent, budget.amount.toNumber())
      : 0;

    return {
      budget: budget ? convertBudgetDecimals(budget) : null,
      currentExpenses: totalSpent,
      todayExpenses: todaySpent,
      dynamicDailyBudget,
    };
  } catch (error) {
    console.error("Error fetching budget:", error);
    throw error;
  }
}

//  Update or create budget
export async function updateBudget(accountId, amount) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const account = await db.account.findFirst({
      where: {
        id: accountId,
        user: { clerkUserId: userId },
      },
    });

    if (!account) throw new Error("Account not found");

    const daysInMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();

    const budget = await db.budget.upsert({
      where: { accountId },
      update: {
        amount,
        daily: amount / daysInMonth,
      },
      create: {
        accountId,
        amount,
        daily: amount / daysInMonth,
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      data: convertBudgetDecimals(budget),
    };
  } catch (error) {
    console.error("Error updating budget:", error);
    return { success: false, error: error.message };
  }
}
