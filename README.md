# stripe-payment-module

Full-stack payment integration module with Stripe checkout sessions, webhook handling, secure backend processing, and payment status tracking.

---
## 📦 Tech Stack

- Runtime: Node.js v22.1.0-alpha.3
- Framework: Express.js
- Payment SDK: Stripe Node.js SDK
- Utilities: dotenv, cors

---

## 📅 Project Info
- Created: 04-2026
- Author: Ariel Alejandro Marzo Gómez
- Environment: Development
- SDK: Stripe Node.js SDK

---

## ⚙️ Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Environment variables
- Create a .env file based on .env.example:
```bash
cp .env.example .env
```
Example .env:
```bash
NODE_ENV=development
# Stripe configuration
STRIPE_SECRET_KEY=your_secret_key_here
```