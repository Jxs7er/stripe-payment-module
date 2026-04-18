// import axios from "axios";
// import doppler from "./doppler.config.js";
// import { getRedis } from "./redis.config.js";
import Stripe from "stripe";

let stripe;

export const connectWithStripe = async () => {
  const secret = process.env.STRIPE_API_SECRET;

  stripe = new Stripe(secret, {
    apiVersion: process.env.STRIPE_VERSION_API,
    protocol: process.env.STRIPE_PROTOCOL_AVAIL,
  });

  return {
    ok: true,
    message: "Stripe instance created successfully",
  };
};

export const getStripeInstance = () => {
  if (!stripe)
    throw new Error(
      "StripeApiInstance not initialized. Call connectWithStripe() first.",
    );
  return stripe;
};
