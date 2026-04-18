import { getStripeInstance } from "../../config/stripe.config.js";

const __error_logs = `stripe.service.js/Service`;

const paymentIntent = {
  async create(payload) {
    try {
      const stripe = getStripeInstance();
      const paymentIntent = await stripe.paymentIntents.create(payload);
      return paymentIntent;
    } catch (error) {
      console.error(
        `❌ Error creating paymentIntent (${__error_logs}):`,
        error.response?.data || error.message,
      );
      throw error;
    }
  },

  async getPaymentIntent(id) {
    try {
      const stripe = getStripeInstance();
      const paymentIntent = await stripe.paymentIntents.retrieve(id);
      return paymentIntent;
    } catch (error) {
      if (error.code == "resource_missing") {
        console.warn(
          `❌ Payment Intent Not Found ${id}`,
          error.response?.data || error.message,
        );
        return null;
      }
      console.error(
        `❌ Error fetching payment intent status (${__error_logs}):`,
        error.response?.data || error.message,
      );
      throw error;
    }
  },

  async cancelPaymentIntent(id, reason) {
    try {
      const stripe = getStripeInstance();
      const paymentIntent = await stripe.paymentIntents.cancel(id, reason);
      return paymentIntent;
    } catch (error) {
      console.error(
        `❌ Error cancelling payment intent (${__error_logs}):`,
        error.response?.data || error.message,
      );
      throw error;
    }
  },

  async updatePaymentIntent(id, payload) {
    try {
    } catch (error) {
      console.error(
        `❌ Error updating payment intent (${__error_logs}):`,
        error.response?.data || error.message,
      );
      throw error;
    }
  },
};

const charge = {
  async getDispute(id) {
    try {
      const stripe = getStripeInstance();
      const dispute = await stripe.disputes.retrieve(id);
      return dispute;
    } catch (error) {
      console.error(
        `❌ Error fetching dipute (${__error_logs}): ${id}`,
        error.response?.data || error.message,
      );
      throw error;
    }
  },
  async updateDispute(id, updates) {
    try {
      const stripe = getStripeInstance();
      const dispute = await stripe.disputes.update(id, {
        ...updates,
      });

      return dispute;
    } catch (error) {
      console.error(
        `❌ Error updating dispute ${id} : (${__error_logs}):`,
        error.response?.data || error.message,
      );
      throw error;
    }
  },
};

const files = {
  async create({ purpose, file = {} }) {
    try {
      const stripe = getStripeInstance();

      const created_file = await stripe.files.create({
        purpose,
        file,
      });
      return created_file;
    } catch (error) {
      console.error(
        `❌ Error trying to create a new file : (${__error_logs}):`,
        error.response?.data || error.message,
      );
      throw error;
    }
  },
};

const orders = {
  async create(payload) {
    try {
      const stripe = getStripeInstance();
      const session = await stripe.checkout.sessions.create(payload);
      return session;
    } catch (error) {
      console.error(
        `❌ Error CREATING order (${__error_logs}):`,
        error.response?.data || error.message,
      );
      throw error;
    }
  },
};

const customers = {
  async getCustomer(id) {
    try {
      const stripe = getStripeInstance();
      const customer = await stripe.customers.retrieve(id);
      return customer;
    } catch (error) {
      console.error(
        `❌ Error fetching dipute (${__error_logs}): ${id}`,
        error.response?.data || error.message,
      );
      throw error;
    }
  },
  async create(payload) {
    try {
      const stripe = getStripeInstance();
      const customer = await stripe.customers.create(payload);
      return customer;
    } catch (error) {
      console.error(
        `❌ Error CREATING a Customer (${__error_logs}):`,
        error.response?.data || error.message,
      );
      throw error;
    }
  },

  async update(id, payload) {
    try {
      const stripe = getStripeInstance();
      const customer = await stripe.customers.update(id, payload);
      return customer;
    } catch (error) {
      console.error(
        `❌ Error CREATING a Customer (${__error_logs}):`,
        error.response?.data || error.message,
      );
      throw error;
    }
  },
};

const config = {
  async getPublicToken() {
    try {
      const public_key = process.env.STRIPE_API_PUBLIC_KEY;
      return public_key;
    } catch (error) {
      console.error(
        `❌ Error fetching conf. public_token (${__error_logs}):`,
        error.response?.data || error.message,
      );
      throw error;
    }
  },
};

export const PaymentService = {
  orders,
  paymentIntent,
  charge,
  files,
  config,
  customers,
};
