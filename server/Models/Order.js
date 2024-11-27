import mongoose from "mongoose";

const OrderSchema =new mongoose.Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, 
  SupplierId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, 

  OrderItems: {
    itemName: { 
      type: String, 
      required: true 
    }, 

    quantity: { 
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

OrderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Orders = model('Orders', OrderSchema);

export default Orders;
