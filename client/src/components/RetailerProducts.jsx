
import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RetailerProducts = ({ retailer, onBack }) => {
  const [cart, setCart] = useState([]);
  const [inventory, setInventory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  // Calculate totals based on cart state
  const totalCost = cart.reduce((sum, item) => sum + (item.costPerUnit * item.quantity), 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.pricePerUnit * item.quantity), 0);

  const handleQuantityChange = (product, change) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.product._id === product.product._id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0);

      return updatedCart;
    });
  };

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => 
        item.product._id === product.product._id
      );

      if (existingProduct) {
        return prevCart.map(item =>
          item.product._id === product.product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handlePlaceOrder = async () => {
    try {
      const decodedData = jwtDecode(token);
      
      const orderItems = cart.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        costPerUnit: item.costPerUnit,
        pricePerUnit: item.pricePerUnit,
      }));

      const order = {
        customerId: decodedData.userId,
        supplierId: retailer._id,
        items: orderItems,
        totalCost,
        totalAmount,
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/orders/orderplaced",
        order,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Order placed successfully!");
        setCart([]);
      } else {
        toast.error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred while placing the order");
    }
  };

  useEffect(() => {
    const fetchInventory = async () => {
      if (!token) {
        toast.error("Authentication required");
        return;
      }

      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/supplier/showinventory/${retailer._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setInventory(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load inventory");
        setInventory([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, [retailer._id, token]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading inventory...</div>
      </div>
    );
  }

  return (
    <div className="flex gap-8">
      {/* Products List */}
      <div className="w-3/5">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 p-2 mb-4 text-gray-600 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <h1 className="mb-6 text-3xl font-bold text-center text-midblue">
          {retailer.ferm} - Products
        </h1>

        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
          {inventory?.stock.map((product) => (
            <div
              key={product.product._id}
              className="flex gap-4 p-4 transition-all duration-300 bg-white border rounded-lg shadow-md hover:shadow-lg"
            >
              {/* <img 
                src="/api/placeholder/112/112" 
                alt={product.product.itemName}
                className="object-cover rounded-lg w-28 h-28" 
              /> */}
              <div className="flex flex-col flex-1">
                <h3 className="mb-2 text-xl font-semibold">
                  {product.product.itemName}
                </h3>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-lg text-midblue">
                    ₹{product.pricePerUnit}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-midblue hover:bg-lightblue"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="w-2/5">
        <h2 className="mb-6 text-2xl font-bold text-center text-midblue">
          Your Cart
        </h2>
        
        <div className="p-4 bg-white rounded-lg shadow-md">
          <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
            {cart.length > 0 ? (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product._id}
                    className="p-4 border rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{item.product.itemName}</h3>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleQuantityChange(item, -1)}
                          className="w-8 h-8 text-white bg-red-500 rounded-full hover:bg-red-600"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item, 1)}
                          className="w-8 h-8 text-white bg-green-500 rounded-full hover:bg-green-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      ₹{item.pricePerUnit} × {item.quantity} = ₹{item.pricePerUnit * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-8 text-lg text-center text-gray-500">
                Your cart is empty
              </p>
            )}
          </div>

          {cart.length > 0 && (
            <div className="pt-4 mt-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total Amount:</span>
                <span className="text-lg font-bold">₹{totalAmount}</span>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="w-full py-2 text-white transition-colors rounded-lg bg-midblue hover:bg-lightblue"
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetailerProducts;