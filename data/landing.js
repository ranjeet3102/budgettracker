
import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
} from "lucide-react";

// Stats Data
export const statsData = [
  {
    value: "1k+",
    label: "Active Users",
  },
  {
    value: "$10k+",
    label: "Transactions Tracked",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
  {
    value: "4.9/5",
    label: "User Rating",
  },
];

// Features Data
export const featuresData = [
  {
    icon: <BarChart3 className="h-8 w-8 text-gray-600" />,
    title: "Advanced Analytics",
    description:
      "Get detailed insights into your spending patterns with AI-powered analytics",
  },
  {
    icon: <Receipt className="h-8 w-8 text-gray-600" />,
    title: "Smart Receipt Scanner",
    description:
      "Extract data automatically from receipts using advanced AI technology",
  },
  {
    icon: <PieChart className="h-8 w-8 text-gray-600" />,
    title: "Budget Planning",
    description: "Create and manage budgets with intelligent recommendations",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-gray-600" />,
    title: "Multi-Account Support",
    description: "Manage multiple accounts and credit cards in one place",
  },
  {
    icon: <Globe className="h-8 w-8 text-gray-600" />,
    title: "Multi-Currency",
    description: "Support for multiple currencies with real-time conversion",
  },
  {
    icon: <Zap className="h-8 w-8 text-gray-600" />,
    title: "Automated Insights",
    description: "Get automated financial insights and recommendations",
  },
];

// How It Works Data
export const howItWorksData = [
  {
    icon: <CreditCard className="h-8 w-8 text-gray-600" />,
    title: "1. Create Your Account",
    description:
      "Get started in minutes with our simple and secure sign-up process",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-gray-600" />,
    title: "2. Track Your Spending",
    description:
      "Automatically categorize and track your transactions in real-time",
  },
  {
    icon: <PieChart className="h-8 w-8 text-gray-600" />,
    title: "3. Get Insights",
    description:
      "Receive AI-powered insights and recommendations to optimize your finances",
  },
];

// Testimonials Data
export const testimonialsData = [
  {
    name: "Rajesh",
    role: "Engineering Student(2nd Year)",
    image: "https://randomuser.me/api/portraits/men/73.jpg",
    quote:
      "This is the budgeting app I wish I had in my first year. Super clean UI and actually useful insights.",
  },
  {
    name: "Sanjay",
    role: "Engineering Student(3rd Year)",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "$martSpend helped me save over $200 in my first month. I didn't realize where I was overspending until I saw the breakdown!",
  },
  {
    name: "kani",
    role: "ECE Student(4th Year)",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
    quote:
       "Before $martSpend, I had no idea where my money was going. Now I feel in control every week — it’s like having a personal finance coach in my pocket.",
  },
];
