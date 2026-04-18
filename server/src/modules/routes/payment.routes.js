import express from "express";
import { PaymentController } from "../controllers/payment.controller.js";

const router = express.Router();

// -------------- ORDER
router.post("/checkout", PaymentController.createAnOrder);
router.get("/payment-intent/:id", PaymentController.getPaymentIntent);

// -------------- CONFIG
router.get("/public-token", PaymentController.getPublicToken);

export default router;
