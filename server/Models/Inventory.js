import mongoose from "mongoose";

const { Schema, model } = mongoose;

const inventorySchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  stock: [{
    itemName: { 
      type: String, 
      required: true 
    }, 
    quantity: { 
      type: Number, 
      required: true, 
      min: 0 
    }, 
    costPerUnit: {  // Cost to the owner
      type: Number, 
      required: true, 
      min: 0 
    }, 
    pricePerUnit: {  // Price to the buyer
      type: Number, 
      required: true, 
      min: 0,
      validate: {
        validator: function(value) {
          return value >= this.costPerUnit; // Ensure price is not less than cost
        },
        message: "pricePerUnit must be greater than or equal to costPerUnit."
      }
    }
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
});

// Middleware to update the `updatedAt` field
inventorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Inventory = model('Inventory', inventorySchema);

export default Inventory;
