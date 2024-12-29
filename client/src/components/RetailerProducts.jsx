// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import React, { useEffect, useState } from 'react';
// import { BsArrowLeft } from 'react-icons/bs';
// import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const RetailerProducts = ({ retailer, onBack }) => {
//   const [totalcost, setTotalcost] = useState(0);
//   const [totalamount, setTotalamount] = useState(0);
//   const [cart, setCart] = useState([]);
//   const [inventory, setInventory] = useState(null);

//   const token = localStorage.getItem("authToken");
//   if (!token) {
//     console.error("No token found!");
//     return;
//   }

//   console.log(token);

//   const handleAddToCart = (product) => {
//     console.log(product);
//     const existingProduct = cart.find((item) => item.product._id === product.product._id);

//     if (existingProduct) {
//       setCart(
//         cart.map((item) =>
//           item.product._id === product.product._id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//       // Update totals when increasing quantity
//       setTotalcost(totalcost + product.costPerUnit);
//       setTotalamount(totalamount + product.pricePerUnit);
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//       // Add price and cost for the first time
//       setTotalcost(totalcost + product.costPerUnit);
//       setTotalamount(totalamount + product.pricePerUnit);
//     }
//   };

//   const handleIncreaseQuantity = (product) => {
//     setCart(
//       cart.map((item) =>
//         item.product.itemName === product.product.itemName
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//     // Update totals when increasing quantity
//     setTotalcost(totalcost + product.costPerUnit);
//     setTotalamount(totalamount + product.pricePerUnit);
//   };

//   const handleDecreaseQuantity = (product) => {
//     setCart(
//       cart
//         .map((item) =>
//           item.product.itemName === product.product.itemName
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//         .filter((item) => item.quantity > 0) // Remove items with quantity 0
//     );
//     // Update totals when decreasing quantity
//     setTotalcost(totalcost - product.costPerUnit);
//     setTotalamount(totalamount - product.pricePerUnit);
//   };

//   const handlePlaceOrder = async () => {
//     try {
//       // Prepare orderItems array to match the backend schema
//       const orderItems = cart.map(item => ({
//         product: item.product._id, // Only the product ID
//         quantity: item.quantity,
//         costPerUnit: item.costPerUnit,
//         pricePerUnit: item.pricePerUnit,
//       }));

//       const decodedData = jwtDecode(token);
  
//       // Prepare the order object according to the backend schema
//       const order = {
//         customerId: decodedData.userId, // Assuming token.userId is available
//         supplierId: retailer._id, // Assuming retailer._id is available
//         items : orderItems, // Array of items from the cart
//         totalCost: totalcost, // Total cost based on costPerUnit
//         totalAmount: totalamount, // Total amount based on pricePerUnit
//       };
  
//       console.log("Order to be sent:", order); // To verify order object
  
//       const response = await axios.post(
//         "http://localhost:8080/api/v1/orders/orderplaced",
//         order, // Send the prepared order to the backend
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include token in header for authorization
//           },
//         }
//       );
  
//       // Handle the response
//       if (response.data.success) {
//         toast.success("Order placed successfully!");
//         setCart([]); // Clear the cart after successful order
//         setTotalamount(0); // Reset total amount
//         setTotalcost(0); // Reset total cost
//         console.log("Order Details:", response.data.order); // Log the order details
//       } else {
//         toast.error("Failed to place order. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error.message);
//       alert("An error occurred while placing the order.");
//     }
//   };
  

//   useEffect(() => {
//     console.log("Retailer:", retailer);
//     const fetchInventory = async () => {
//       try {
//         console.log(retailer._id);

//         const { data } = await axios.get(
//           `http://localhost:8080/api/v1/supplier/showinventory/${retailer._id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Token in header
//             },
//           }
//         );
//         setInventory(data);
//       } catch (error) {
//         console.error(error.message);
//         setInventory([]); // Handle the error scenario by setting inventory to an empty array
//       }
//     };
//     fetchInventory();
//   }, []); // Empty dependency array to run only once when component mounts

//   return (
//     <div className='flex'>
//       <div className="w-[60%] max-h-[90vh] overflow-y-scroll">
//         <BsArrowLeft className="relative px-2 ml-2 text-4xl font-bold rounded-lg top-4 text-dark w-fit hover:bg-midblue" onClick={onBack} />
//         <h1 className="mb-4 text-3xl font-bold text-center text-midblue ">{retailer.ferm} - Products</h1>
//         <div className="flex-col gap-6">
//           {inventory && inventory.stock.map((product) => (
//             <div
//               key={product.product._id}
//               className="flex gap-4 w-[40vw] p-4 transition-all duration-300 border rounded-lg shadow-lg bg-light border-midblue hover:shadow-midblue hover:scale-105"
//             >
//               <img src="" alt="" className="w-28 h-28 rounded-xl" />
//               <div className="flex-col w-[27vw]">
//                 <h3 className="mb-2 text-2xl font-semibold text-dark">{product.product.itemName}</h3>
//                 <div className="flex justify-between ">
//                   <p className="mb-4 text-lg text-midblue">Price:  ₹{product.pricePerUnit}</p>
//                   <button
//                     onClick={() => handleAddToCart(product)}
//                     className="px-2 py-1 text-sm font-semibold text-white transition-colors duration-300 rounded h-9 bg-midblue hover:bg-lightblue"
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="w-[40%]">
//         <h1 className="mb-4 text-4xl font-bold text-center text-midblue ">Your Cart</h1>
//         <div className="overflow-y-scroll max-h-96">
//           {cart.length > 0 ? (
//             cart.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-between p-2 mt-2 bg-white rounded-md shadow-md "
//               >
//                 <div>
//                   <p className="font-semibold">{item.product.itemName}</p>
//                   <p>{`Price: ₹${item.pricePerUnit}`}</p>
//                   <p>{`Quantity: ${item.quantity}`}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => handleDecreaseQuantity(item)}
//                     className="px-2 py-1 text-white bg-red-500 rounded-md"
//                   >
//                     -
//                   </button>
//                   <button
//                     onClick={() => handleIncreaseQuantity(item)}
//                     className="px-2 py-1 text-white bg-green-500 rounded-md"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-2xl font-semibold text-center text-gray-500 ">Cart is empty</p>
//           )}
//         </div>

//         {cart.length > 0 && (
//           <div className="flex justify-between p-4 mt-8">
//             <p>{`Total Price: ₹${totalamount}`}</p>
//             <button
//               onClick={handlePlaceOrder}
//               className="px-4 py-2 mt-4 text-white rounded-md bg-midblue"
//             >
//               Place Order
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default RetailerProducts;
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

        <h1 className="mb-6 text-3xl font-bold text-center text-blue-600">
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
                className="object-cover w-28 h-28 rounded-lg" 
              /> */}
              <div className="flex flex-col flex-1">
                <h3 className="mb-2 text-xl font-semibold">
                  {product.product.itemName}
                </h3>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-lg text-blue-600">
                    ₹{product.pricePerUnit}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
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
        <h2 className="mb-6 text-2xl font-bold text-center text-blue-600">
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
                className="w-full py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
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