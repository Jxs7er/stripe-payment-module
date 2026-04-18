import app from "./src/app.js";

import "./src/config/env.js";
import { connectWithStripe } from "./src/config/stripe.config.js";
import { notFounded } from "./src/middlewares/404.middleware.js";

const PORT = process.env.NODE_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

const response = await connectWithStripe();
console.log(response.message);

app.use(notFounded);
