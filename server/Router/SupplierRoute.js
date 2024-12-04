import express from "express";
import { displaySupplierController, showInventoryController, updateInventoryController } from "../Controller/SupplierController.js";
import userAuth from "../Middleware/authMiddleware.js";  

const supplierRouter = express.Router();

supplierRouter.get("/", userAuth, displaySupplierController);
supplierRouter.get("/showinventory/:id", userAuth, showInventoryController);
supplierRouter.patch("/updateinventory/:id", userAuth, updateInventoryController);

export default supplierRouter;
