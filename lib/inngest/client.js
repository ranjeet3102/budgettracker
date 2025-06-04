import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "SmartSpend-platform", // Unique app ID
  name: "SmartSpend Platform",
  retryFunction: async (attempt) => ({
    delay: Math.pow(2, attempt) * 1000, // Exponential backoff
    maxAttempts: 2,
  }),
});