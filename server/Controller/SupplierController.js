import mongoose from "mongoose";
import Inventory from "../Models/Inventory.js";
import userSchema from "../Models/User.js";
import Product from "../Models/Product.js";

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

    // Fetch inventory and populate product details
    const userInventory = await Inventory.findOne({ userId: id }).populate({
      path: "stock.product", // Path to populate (nested path)
      model: "Product", // The model to use for populating
    });

    res.status(200).json(userInventory);
  } catch (error) {
    next(error);
  }
};

export const UpdateInventoryController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productId, itemName, quantity, pricePerUnit, costPerUnit } = req.body;

    // Ensure the required fields are provided
    if (!id || (productId && (quantity === undefined && pricePerUnit === undefined && costPerUnit === undefined))) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Find the inventory based on the inventoryId
    const supplierInventory = await Inventory.findById(id);
    if (!supplierInventory) {
      return res.status(404).json({ success: false, message: "Inventory not found" });
    }

    let product;

    if (productId) {
      // If productId is provided, find the product in the inventory and update its quantity
      product = supplierInventory.stock.find(item => item.product.toString() === productId);

      if (product) {
        // Update the quantity if it's provided
        if (quantity !== undefined) {
          product.quantity = quantity;
        }

        // If pricePerUnit or CostPerUnit is provided, update them in the Product collection
        if (pricePerUnit !== undefined || CostPerUnit !== undefined) {
          await Product.findByIdAndUpdate(
            productId,
            { pricePerUnit, costPerUnit },
            { new: true } // Get the updated product after saving
          );
        }
      } else {
        return res.status(404).json({ success: false, message: "Product not found in inventory" });
      }
    } else {
      // If no productId is provided, create a new product entry and append it to the inventory
      const newProduct = new Product({
        itemName,
        pricePerUnit,
        costPerUnit,
      });

      await newProduct.save(); // Save the new product to the Product collection

      // Add the new product to the inventory
      product = {
        product: newProduct._id, // Store the Product ID in the inventory stock
        quantity,
      };

      supplierInventory.stock.push(product); // Append the new product to the inventory stock
    }

    // Save the updated inventory
    await supplierInventory.save();

    res.status(200).json({
      success: true,
      message: "Inventory updated successfully",
      inventory: supplierInventory,
    });
  } catch (error) {
    next(error);
  }
};

