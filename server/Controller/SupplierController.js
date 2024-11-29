import mongoose from "mongoose";
import Inventory from "../Models/Inventory.js";
import userSchema from "../Models/User.js";

export const DisplaySupplierController = async (req, res, next) => {
  try {
    const UserRole = req.body.role;
    let Suppliers = [];
    // console.log(req);
    if (UserRole === "Customer") {
      Suppliers = await userSchema.find({ role: "Retailer" });
    } else if (UserRole === "Retailer") {
      Suppliers = await userSchema.find({ role: "WholeSaler" });
    }

    res.status(200).json({
      Suppliers,
    });
  } catch (error) {
    next(error);
  }
};

export const ShowinventoryController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userInventory = await Inventory.findOne({ userId: id });
    res.status(200).json(userInventory);
  } catch (error) {
    next(error);
  }
};
