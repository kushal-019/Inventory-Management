import mongoose from "mongoose";
import Inventory from "../Models/Inventory.js";
import userSchema from "../Models/User.js";
import Product from "../Models/Product.js";

// Display suppliers based on user role
export const displaySupplierController = async (req, res, next) => {
  try {
    const { role: userRole } = req.body;
    let suppliers = [];

    // Fetch suppliers based on the user's role
    if (userRole === "Customer") {
      suppliers = await userSchema.find({ role: "Retailer" });
    } else if (userRole === "Retailer") {
      suppliers = await userSchema.find({ role: "WholeSaler" });
    }

    res.status(200).json({ suppliers });
  } catch (error) {
    next(error);
  }
};

// Show inventory of a specific supplier
export const showInventoryController = async (req, res, next) => {
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

// Update inventory for a supplier
export const updateInventoryController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productId, itemName, quantity, pricePerUnit, costPerUnit } =
      req.body;


    // Ensure the required fields are provided
    if (
      !id ||
      (productId &&
        quantity === null &&
        pricePerUnit === null &&
        costPerUnit === null)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Find the inventory based on the inventoryId
    const supplierInventory = await Inventory.findById(id);
    if (!supplierInventory) {
      return res
      .status(404)
      .json({ success: false, message: "Inventory not found" });
    }

    let product;

    if (productId) {
      // If productId is provided, find the product in the inventory and update its quantity
      product = supplierInventory.stock.find(
        (item) => item.product.toString() === productId
      );

      if (product) {
       
        if (quantity !== null) {
          product.quantity = quantity; // Update quantity if provided
        }
        // If pricePerUnit or costPerUnit is provided, update them 
        if (pricePerUnit !== null) {
          product.pricePerUnit = pricePerUnit; 
        }
        if (costPerUnit !== null) {
          product.costPerUnit = costPerUnit; 
        }
        
      } else {
        return res
        .status(404)
        .json({ success: false, message: "Product not found in inventory" });
      }
    } else {
      // If no productId is provided, create a new product entry and append it to the inventory
      const newProduct = new Product({
        itemName,
      });

      await newProduct.save(); // Save the new product to the Product collection

      // Add the new product to the inventory
      product = {
        product: newProduct._id, // Store the Product ID in the inventory stock
        quantity,
        pricePerUnit,
        costPerUnit,
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
