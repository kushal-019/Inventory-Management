import React, { useState } from "react";

const RightSidebar = ({ selectedItem }) => {
  const [cart, setCart] = useState([]);

  if (!selectedItem) {
    return (
      <div className="flex-1 p-4 text-center bg-gray-100">
        <h2 className="text-2xl text-gray-600">Select an entity to view products</h2>
      </div>
    );
  }

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.name === product.name);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleIncreaseQuantity = (product) => {
    setCart(
      cart.map((item) =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (product) => {
    setCart(
      cart
        .map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // Remove items with quantity 0
    );
  };

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    setCart([]);
  };

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <h2 className="text-2xl font-bold text-center text-[#1c618f]">
        Products of {selectedItem.ferm}
      </h2>

      {/* Product List */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Available Products</h3>
        {selectedItem.products.map((product, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 mt-2 bg-white rounded-md shadow-md"
          >
            <div>
              <p className="font-semibold">{product.name}</p>
              <p>{`Price: ₹${product.price}`}</p>
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              className="px-3 py-1 bg-[#1c618f] text-white rounded-md"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Cart</h3>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 mt-2 bg-white rounded-md shadow-md"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p>{`Price: ₹${item.price}`}</p>
                <p>{`Quantity: ${item.quantity}`}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecreaseQuantity(item)}
                  className="px-2 py-1 text-white bg-red-500 rounded-md"
                >
                  -
                </button>
                <button
                  onClick={() => handleIncreaseQuantity(item)}
                  className="px-2 py-1 text-white bg-green-500 rounded-md"
                >
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Cart is empty</p>
        )}
        {cart.length > 0 && (
          <button
            onClick={handlePlaceOrder}
            className="px-4 py-2 mt-4 text-white bg-green-500 rounded-md"
          >
            Place Order
          </button>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
