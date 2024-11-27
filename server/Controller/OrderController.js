import userSchema from "../Models/User.js";
import Orders from "../Models/Order.js";

export const OrderHistoryController = async (req, res, next) => {
  try {
    const userid = req.user.userId;

    const placedorders = await Orders.find({ userId: userid });

    let SupplierName = [];

    for (const order of placedorders) {
      const user = await userSchema.findOne({ _id: order.SupplierId });
      SupplierName.push(user.name + " " + user.lastname);
    }

    res.status(200).json({
      placedorders,
      SupplierName,
    });
  } catch (error) {
    next(error);
  }
};

export const recievedOrdersController = async (req, res, next) => {
  try {
    const userid = req.user.userId;

    const recievedorders = await Orders.find({ SupplierId: userid });

    let CustomerName = [];

    for (const order of recievedorders) {
      const user = await userSchema.findOne({ _id: order.userId });
      recievedorders.push(user.name + " " + user.lastname);
    }

    res.status(200).json({
      placedorders,
      recievedorders,
    });
  } catch (error) {
    next(error);
  }
};

export const orderplacedController = async (req, res, next) => {
  try {
    const { customer, Supplier, items } = req.body;
    const order = await Orders.create({ customer, Supplier, items });

    res
      .status(201)
      .send({ success: true, message: "Opder placed successfully" });
  } catch (error) {
    next(error);
  }
};
