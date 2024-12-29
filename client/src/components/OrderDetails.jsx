// import React from 'react'
// import { BsArrowLeft } from 'react-icons/bs'
// const OrderDetails = ({ order, onBack }) => {
//     // console.log("order : " ,order)
//     return (
//         <div >

//             <BsArrowLeft className="relative px-2 ml-2 text-4xl font-bold rounded-lg top-4 text-dark w-fit hover:bg-midblue" onClick={onBack} />

//             <h1 className="mb-4 text-3xl font-bold text-center text-midblue ">Order Details</h1>
//             <h3 className="mb-4 text-2xl font-bold text-center text-lightblue">Order ID: {order._id}</h3>
//             <div className="flex justify-around mb-4 text-xl font-semibold">
//                 <p className="text-xl font-semibold">Supplier: {order.supplierId.name}</p>
//                 <p>Status : {order.status}</p>
//                 <p>Amount : {order.totalAmount}
//                 </p></div>

//             <div className="w-full overflow-y-scroll border rounded-lg shadow-md max-h-96 border-lightblue">
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr className="bg-lightblue text-dark">
//                             <th className="p-3 border border-midblue">S.No:</th>
//                             <th className="p-3 border border-midblue">Product</th>
//                             <th className="p-3 border border-midblue">Quantity</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {order.orderItems.map((item, index) => (
//                             <tr
//                                 key={index}
//                                 className="hover:bg-midblue bg-light"
//                             >
//                                 <td className="p-2 border border-midblue text-dark">{index + 1}</td>
//                                 <td className="p-2 border border-midblue text-dark">{item.product.itemName
//                                 }</td>
//                                 <td className="p-2 border border-midblue text-dark">{item.quantity}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>


//         </div>
//     )
// }

// export default OrderDetails

import React from 'react';
import { ArrowLeft, Package, FileText, DollarSign, UserCheck, Clock } from 'lucide-react';

const OrderDetails = ({ order, onBack }) => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center mb-6">
                    <button 
                        onClick={onBack}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center"
                    >
                        <ArrowLeft className="h-6 w-6" />
                        <span className="ml-2 font-medium">Back</span>
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Order Details</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="flex items-start space-x-3">
                            <FileText className="h-5 w-5 text-gray-400 mt-1" />
                            <div>
                                <p className="text-sm text-gray-500">Order ID</p>
                                <p className="font-medium text-gray-900">{order._id}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                            <UserCheck className="h-5 w-5 text-gray-400 mt-1" />
                            <div>
                                <p className="text-sm text-gray-500">Supplier</p>
                                <p className="font-medium text-gray-900">{order.supplierId.name}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                            <Clock className="h-5 w-5 text-gray-400 mt-1" />
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    order.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                    order.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                            <DollarSign className="h-5 w-5 text-gray-400 mt-1" />
                            <div>
                                <p className="text-sm text-gray-500">Total Amount</p>
                                <p className="font-medium text-gray-900">${order.totalAmount.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Order Items</h2>
                        <div className="overflow-hidden rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            S.No
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Quantity
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {order.orderItems.map((item, index) => (
                                        <tr 
                                            key={index}
                                            className="hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {item.product.itemName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {item.quantity}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;