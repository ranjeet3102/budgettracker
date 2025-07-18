import arcjet, { tokenBucket } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["account"], // Track based on Clerk userId
  rules: [
    // Rate limiting specifically for collection creation
    tokenBucket({
      mode: "LIVE",
      refillRate: 20, // 20 collections
      interval: 3600, // per hour
      capacity: 20, // maximum burst capacity
    }),
  ],
});

export default aj;