import express from "express";
import dotenv from "dotenv";
import connectDB from "./Database.config.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./Router/Authrouter.js";
import orderRouter from "./Router/OrderRouter.js";
import supplierRouter from "./Router/SupplierRoute.js";
import errorMiddleWare from "./Middleware/errorMiddleware.js";

const app = express();

dotenv.config();
connectDB();

app.use(express.json());
app.use(cookieParser());

// CORS configuration for production
const corsOptions = {
  origin: "https://inventory-management-ihxslzrpy-kushal-goels-projects.vercel.app", //  frontend URL
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true, // For cookies and authentication headers
};
app.use(cors(corsOptions));

// API routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/supplier", supplierRouter);

app.use(errorMiddleWare);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

export default app;