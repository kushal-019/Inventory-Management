import express from "express";
import dotenv from "dotenv";
import connectDB from "./Database.config.js";
import cookieParser from "cookie-parser";

import cors from "cors";

import errorMiddleWare from "./Middleware/errorMiddleware.js";
import Authrouter from "./Router/Authrouter.js";
import OrderRouter from "./Router/OrderRouter.js";
import SupplierRouter from "./Router/SupplierRoute.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
dotenv.config();
connectDB();

app.use(errorMiddleWare);

app.use("/api/v1/auth", Authrouter);
app.use("/api/v1/orders", OrderRouter);
app.use("/api/v1/supplier", SupplierRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("App Running");
});


// {
//   "success": true,
//   "message": "User created successfully",
//   "user": {
//       "name": "Kushal",
//       "email": "Kushal@gmail.com",
//       "role": "Customer"
//   },
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzRhMDUwNzNhYTFmOWU3ZDk2YjI1NzAiLCJpYXQiOjE3MzI5MDQxOTksImV4cCI6MTczMzMzNjE5OX0.w_GcpeCunHk8LOUN1B8iTlvzuf6CYfrVDiDfW2s4euE"
// }


// {
//   "success": true,
//   "message": "User created successfully",
//   "user": {
//       "name": "Kushal1",
//       "email": "Kushal1@gmail.com",
//       "role": "Retailer"
//   },
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzRhMDU1M2NjZjM5ZjViNzEyNjk2MWEiLCJpYXQiOjE3MzI5MDQyNzUsImV4cCI6MTczMzMzNjI3NX0.mYO20J9lqsJlbCDjJ_5M1qpBEkFcPhzdZ-m5Quv0LiE"
// }


// {
//   "success": true,
//   "message": "User created successfully",
//   "user": {
//       "name": "Kushal2",
//       "email": "Kushal2@gmail.com",
//       "role": "WholeSaler"
//   },
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzRhMDU3YWIxNDc5ZDQyYjQ4OTUyN2UiLCJpYXQiOjE3MzI5MDQzMTQsImV4cCI6MTczMzMzNjMxNH0.mCx-iEtMrR-2d7OwFklG9kd7rDC3fyVTOLlEQEyF-ao"
// }