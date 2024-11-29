import mongoose from "mongoose";

const { Schema, model } = mongoose;

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  SupplierId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Rejected", "Confirmed"],
    default: "Pending", // Ensure consistent capitalization
  },
  OrderItems: [
    {
      itemName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
      },
      pricePerUnit: {
        // Price to buyer
        type: Number,
        required: true,
        min: 0,
      },
      CostPerUnit: {
        // cost to supplier
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  totalCost: {
    type: Number,
    required: true,
    min: 0,
  },
  totalAmount: {
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

OrderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Orders = model("Orders", OrderSchema);

export default Orders;
