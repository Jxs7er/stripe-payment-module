import app from "./src/app.js";

import "./src/config/env.js";
import { notFounded } from "./src/middlewares/404.middleware.js";

const PORT = process.env.NODE_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

app.use(notFounded);
