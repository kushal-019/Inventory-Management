import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema({
  itemName: {
    type: String,
    required: true,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the `updatedAt` field
productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Product = model("Product", productSchema);

export default Product;
