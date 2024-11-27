import express from "express";
import { OrderHistoryController, recievedOrdersController ,orderplacedController } from "../Controller/OrderController";

const OrderRouter = express.Router();

OrderRouter.get("/orderhistory" , OrderHistoryController);
OrderRouter.get("/orderrecieved" , recievedOrdersController);
OrderRouter.post("/orderplaced" , orderplacedController);
