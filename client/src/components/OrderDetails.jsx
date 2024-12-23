import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
const OrderDetails = ({ order, onBack }) => {
    return (
        <div >

            <BsArrowLeft className="relative px-2 ml-2 text-4xl font-bold rounded-lg top-4 text-dark w-fit hover:bg-midblue" onClick={onBack} />

            <h1 className="mb-4 text-3xl font-bold text-center text-midblue ">Order Details</h1>
            <h3 className="mb-4 text-2xl font-bold text-center text-lightblue">Order ID: {order._id}</h3>
            <div className="flex justify-around mb-4 text-xl font-semibold">
                <p className="text-xl font-semibold">Supplier: {order.supplierId.name}</p>
                <p>Status : {order.status}</p>
                <p>Amount : {order.totalAmount}
                </p></div>

            <div className="w-full overflow-y-scroll border rounded-lg shadow-md max-h-96 border-lightblue">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-lightblue text-dark">
                            <th className="p-3 border border-midblue">S.No:</th>
                            <th className="p-3 border border-midblue">Product</th>
                            <th className="p-3 border border-midblue">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.orderItems.map((item, index) => (
                            <tr
                                key={index}
                                className="hover:bg-midblue bg-light"
                            >
                                <td className="p-2 border border-midblue text-dark">{index + 1}</td>
                                <td className="p-2 border border-midblue text-dark">{item.product}</td>
                                <td className="p-2 border border-midblue text-dark">{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default OrderDetails

