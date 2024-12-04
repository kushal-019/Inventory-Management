import express from "express";
import {
  orderHistoryController,
  orderPlacedController,
  receivedOrdersController,
  updateOrderStatusController,
} from "../Controller/OrderController.js"; 
import userAuth from "../Middleware/authMiddleware.js";

const orderRouter = express.Router();

// Sent as Consumer
orderRouter.get("/orderhistory", userAuth, orderHistoryController);
// Received as supplier
orderRouter.get("/orderrecieved", userAuth, receivedOrdersController);
// Action taken on order
orderRouter.patch("/updateOrderStatus", userAuth, updateOrderStatusController);
// New Order Route
orderRouter.post("/orderplaced", userAuth, orderPlacedController);

export default orderRouter;
