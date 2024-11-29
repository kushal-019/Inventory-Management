import userSchema from "../Models/User.js";
import Orders from "../Models/Order.js";
import Inventory from "../Models/Inventory.js";

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
      CustomerName.push(user.name + " " + user.lastname);
    }

    res.status(200).json({
      recievedorders,
      CustomerName,
    });
  } catch (error) {
    next(error);
  }
};

const updateInventoryAfterOrder = async (order) => {
  try {
    const { SupplierId, OrderItems } = order;

    const supplierInventory = await Inventory.findOne({ userId: SupplierId });

    if (!supplierInventory) {
      throw new Error("Supplier inventory not found");
    }

    for (let item of OrderItems) {
      const inventoryItem = supplierInventory.stock.find(
        (inventoryItem) => inventoryItem.itemName === item.itemName
      );

      if (inventoryItem) {
        inventoryItem.quantity -= item.quantity;

        if (inventoryItem.quantity < 0) {
          throw new Error(`Not enough stock for item: ${item.itemName}`);
        }
      } else {
        throw new Error(
          `Item ${item.itemName} not found in supplier's inventory`
        );
      }
    }
    await supplierInventory.save();

    console.log("Inventory updated successfully");
  } catch (error) {
    console.error("Error updating inventory:", error.message);
    throw error;
  }
};

export const orderplacedController = async (req, res, next) => {
  try {
    const { customerId, SupplierId, items, totalAmount, totalCost } = req.body;
    const order = await Orders.create({
      userId: customerId,
      SupplierId: SupplierId,
      OrderItems: items,
      totalAmount: totalAmount,
      totalCost: totalCost,
    });

    await updateInventoryAfterOrder(order);

    res
      .status(201)
      .send({ success: true, message: "Order placed successfully" });
  } catch (error) {
    next(error);
  }
};
