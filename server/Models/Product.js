import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProductSchema = new Schema({
  itemName: {
    type: String,
    required: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
    min: 0,
  },
  costPerUnit: {
    type: Number,
    required: true,
    min: 0,
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
ProductSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Product = model("Product", ProductSchema);

export default Product;
