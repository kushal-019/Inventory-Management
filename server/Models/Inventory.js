import mongoose from "mongoose";

const inventorySchema =new mongoose.Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, 

  stock: {
    itemName: { 
      type: String, 
      required: true 
    }, 

    quantity: { 
      type: Number, 
      required: true, 
      min: 0 
    }, 

    CostPerUnit: {  // cost to owner
      type: Number, 
      required: true, 
      min: 0 
    }, 
    pricePerUnit: {  // Prize to buyer
      type: Number, 
      required: true, 
      min: 0 
    }, 
    
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  }, 

  updatedAt: { 
    type: Date, 
    default: Date.now 
  }, 
});

inventorySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Inventory = model('Inventory', inventorySchema);

export default Inventory;
