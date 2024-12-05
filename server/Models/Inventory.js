import mongoose from "mongoose";

const { Schema, model } = mongoose;

const inventorySchema = new Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  stock: [
    {
      product: {
        type: String,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
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
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

inventorySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Inventory = model("Inventory", inventorySchema);

export default Inventory;
