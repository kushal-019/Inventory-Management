import express from "express";
import {
  DisplaySupplierController,
  ShowinventoryController,
  UpdateInventoryController,
} from "../Controller/SupplierController.js";
import userAuth from "../Middleware/authMiddlewaare.js";

const SupplierRouter = express.Router();

SupplierRouter.get("/", userAuth, DisplaySupplierController);
SupplierRouter.get("/showinventory/:id", userAuth, ShowinventoryController);
SupplierRouter.patch("/updateinventory/:id", userAuth, UpdateInventoryController);

export default SupplierRouter;