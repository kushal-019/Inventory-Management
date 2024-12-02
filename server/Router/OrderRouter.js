import express from "express";
import {
  OrderHistoryController,
  recievedOrdersController,
  orderplacedController,
  updateOrderStatusController,
} from "../Controller/OrderController.js";
import userAuth from "../Middleware/authMiddlewaare.js";

const OrderRouter = express.Router();

// Sent as Consumer
OrderRouter.get("/orderhistory", userAuth, OrderHistoryController);
// Recieved as supllier
OrderRouter.get("/orderrecieved", userAuth, recievedOrdersController);
// Action taken on order
OrderRouter.patch("/updateOrderStatus", userAuth, updateOrderStatusController);
// New Order Route
OrderRouter.post("/orderplaced", userAuth, orderplacedController);

export default OrderRouter;
