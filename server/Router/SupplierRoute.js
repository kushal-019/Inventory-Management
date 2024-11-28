import express from "express";
import {
  DisplaySupplierController,
  ShowinventoryController,
} from "../Controller/SupplierController.js";
import userAuth from "../Middleware/authMiddlewaare.js";

const SupplierRouter = express.Router();

SupplierRouter.get("/", userAuth, DisplaySupplierController);
SupplierRouter.get("/showinventory:id", userAuth, ShowinventoryController);

export default SupplierRouter;