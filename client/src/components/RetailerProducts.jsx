import React, { useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
const RetailerProducts = ({ userId, retailer, onBack }) => {
    const [total,setTotal]=useState(0);
    const [cart, setCart] = useState([]);
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
        setTotal(total+product.price);
      };
    
      const handleIncreaseQuantity = (product) => {
        setCart(
          cart.map((item) =>
            item.name === product.name
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
        setTotal(total+product.price);
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
        setTotal(total-product.price);
      };
    
      const handlePlaceOrder =async  () => {
        try {

          const order = {
            customerId: userId,
            supplierId:retailer._id ,
            items: cart, 
            totalAmount: cart.reduce((sum, item) => sum + item.quantity, 0),
            totalCost: total, 
          };
          const response = await axios.post("https://localhost:8080/api/v1/orders/orderplaced", order);
      
          if (response.data.success) {
            alert("Order placed successfully!");
            setCart([]);
            setTotal(0);
            console.log(response.data.message);
            console.log("Order Details:", response.data.order);
          } else {
            alert("Failed to place order. Please try again.");
          }
        } catch (error) {
          console.error("Error placing order:", error.message);
          alert("An error occurred while placing the order.");
        }
      };
  return (
    <div className='flex'>
        <div className="w-[60%] max-h-[90vh] overflow-y-scroll">
        <BsArrowLeft className="relative px-2 ml-2 text-4xl font-bold rounded-lg top-4 text-dark w-fit hover:bg-midblue" onClick={onBack} />
        <h1 className="mb-4 text-3xl font-bold text-center text-midblue ">{retailer.businessName} - Products</h1>
        <div className="flex-col gap-6">
           

  {retailer.products.map((product) => (
    <div
      key={product.id}
      className="flex gap-4 w-[40vw] p-4 transition-all duration-300 border rounded-lg shadow-lg bg-light border-midblue hover:shadow-midblue hover:scale-105"
    >
        <img src="" alt="" className="w-28 h-28 rounded-xl" />
        <div className="flex-col w-[27vw]">
      <h3 className="mb-2 text-2xl font-semibold text-dark">{product.name}</h3>
      <div className="flex justify-between ">
      <p className="mb-4 text-lg text-midblue">Price: ${product.price}</p>
      <button
        onClick={() => handleAddToCart(product)}
        className="px-2 py-1 text-sm font-semibold text-white transition-colors duration-300 rounded h-9 bg-midblue hover:bg-lightblue"
      >
        Add to Cart
      </button></div></div>
    </div>
  ))}
</div>

    </div>
    <div className="w-[40%]  ">
    <h1 className="mb-4 text-4xl font-bold text-center text-midblue ">Your Cart</h1>
    <div className="overflow-y-scroll max-h-96">
    {cart.length > 0 ? (
          cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 mt-2 bg-white rounded-md shadow-md "
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
          <p className="text-2xl font-semibold text-center text-gray-500 ">Cart is empty</p>
        )}</div>
    
        {cart.length > 0 && (
            <div className="flex justify-between p-4 mt-8">
                <p>{`Total Price: ₹${total}`}</p>
          <button
            onClick={handlePlaceOrder}
            className="px-4 py-2 mt-4 text-white rounded-md bg-midblue"
          >
            Place Order
          </button></div>
        )}</div>
    </div>
  )
}

export default RetailerProducts
