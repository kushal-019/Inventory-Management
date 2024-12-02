import userSchema from "../Models/User.js";
import Orders from "../Models/Order.js";
import Inventory from "../Models/Inventory.js";

// Order you have sent
export const OrderHistoryController = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const placedOrders = await Orders.find({ userId }).populate({
      path: "supplierId",
      select: "name lastname",
    });

    const formattedOrders = placedOrders.map((order) => ({
      ...order.toObject(),
      supplierName: `${order.supplierId.name} ${order.supplierId.lastname}`,
    }));

    res.status(200).json({ placedOrders: formattedOrders });
  } catch (error) {
    next(error);
  }
};
// Order you recieved
export const recievedOrdersController = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const receivedOrders = await Orders.find({ supplierId: userId }).populate({
      path: "userId",
      select: "name lastname",
    });

    const formattedOrders = receivedOrders.map((order) => ({
      ...order.toObject(),
      customerName: `${order.userId.name} ${order.userId.lastname}`,
    }));

    res.status(200).json({ receivedOrders: formattedOrders });
  } catch (error) {
    next(error);
  }
};


// Order you just trying to place
export const orderplacedController = async (req, res, next) => {
  try {
    const { customerId, SupplierId, items, totalAmount, totalCost } = req.body;

    // Validate the input data
    if (!customerId || !SupplierId || !items || items.length === 0) {
      return res.status(400).send({ success: false, message: "Invalid data" });
    }

    // Create the order with default status 'Pending'
    const order = await Orders.create({
      userId: customerId,
      supplierId: SupplierId,
      OrderItems: items,
      totalAmount,
      totalCost,
    });

    res.status(201).send({
      success: true,
      message: "Order placed successfully. Waiting for confirmation.",
      order,
    });
  } catch (error) {
    next(error);
  }
};

const updateInventoryAfterOrder = async (order) => {
  try {
    const { supplierId, OrderItems, userId } = order;

    const supplierInventory = await Inventory.findOne({ userId: supplierId });
    const customer = await userSchema.findById(userId);

    if (!customer) {
      throw new Error("Customer not found");
    }

    if (!supplierInventory) {
      throw new Error("Supplier inventory not found");
    }

    for (let item of OrderItems) {
      const inventoryItem = supplierInventory.stock.find(
        (stockItem) => stockItem.product.toString() === item.product.toString()
      );

      if (inventoryItem) {
        inventoryItem.quantity -= item.quantity;

        if (inventoryItem.quantity < 0) {
          throw new Error(`Not enough stock for product: ${item.product}`);
        }
      } else {
        throw new Error(
          `Product ${item.product} not found in supplier's inventory`
        );
      }
    }

    await supplierInventory.save();

    // If customer is a retailer, update their inventory
    if (customer.role === "retailer") {
      const customerInventory = await Inventory.findOne({ userId: customer._id });

      if (!customerInventory) {
        throw new Error("Retailer inventory not found");
      }

      for (let item of OrderItems) {
        const customerItem = customerInventory.stock.find(
          (stockItem) => stockItem.product.toString() === item.product.toString()
        );

        if (customerItem) {
          customerItem.quantity += item.quantity;
        } else {
          customerInventory.stock.push({ product: item.product, quantity: item.quantity });
        }
      }

      await customerInventory.save();
    }

    console.log("Inventory updated successfully");
  } catch (error) {
    console.error("Error updating inventory:", error.message);
    throw error;
  }
};


export const updateOrderStatusController = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;

    if (!["Pending", "Rejected", "Confirmed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedOrder = await Orders.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status === "Confirmed") {
      await updateInventoryAfterOrder(updatedOrder);
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};
