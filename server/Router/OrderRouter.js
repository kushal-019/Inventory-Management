import express from "express";
import {
  OrderHistoryController,
  recievedOrdersController,
  orderplacedController,
} from "../Controller/OrderController.js";
import userAuth from "../Middleware/authMiddlewaare.js";

const OrderRouter = express.Router();

OrderRouter.get("/orderhistory", userAuth, OrderHistoryController);
OrderRouter.get("/orderrecieved", userAuth, recievedOrdersController);
OrderRouter.post("/orderplaced", userAuth, orderplacedController);

export default OrderRouter;
