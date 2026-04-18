import express from "express";
import cors from "cors";
import { register_routes } from "./config/app.route.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
register_routes(app);

export default app;
