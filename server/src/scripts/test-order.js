import { PaymentService } from "../services/stripe.service.js";

const mockOrderPayload = {
  payment_method_types: ["card"],
  mode: "payment",
  line_items: [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: "Nike Air Max",
          description: "Demo product for checkout test",
          images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff"],
        },
        unit_amount: 5000,
      },
      quantity: 1,
    },
  ],
  success_url: `http://localhost:${process.env.NODE_PORT}/success`,
  cancel_url: `http://localhost:${process.env.NODE_PORT}/cancel`,
};

const testCheckout = async () => {
  try {
    const order = await PaymentService.orders.create(mockOrderPayload);

    console.log("✅ Checkout session created");
    console.log(order.url);
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
};

testCheckout();
