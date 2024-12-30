
import React from 'react';
import { ArrowLeft, Package, FileText, DollarSign, UserCheck, Clock } from 'lucide-react';

const OrderDetails = ({ order, onBack }) => {
    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center mb-6">
                    <button 
                        onClick={onBack}
                        className="flex items-center p-2 text-gray-600 transition-colors duration-200 rounded-lg hover:bg-gray-100"
                    >
                        <ArrowLeft className="w-6 h-6" />
                        <span className="ml-2 font-medium">Back</span>
                    </button>
                </div>

                <div className="p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h1 className="mb-6 text-2xl font-bold text-gray-900">Order Details</h1>
                    
                    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="flex items-start space-x-3">
                            <FileText className="w-5 h-5 mt-1 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Order ID</p>
                                <p className="font-medium text-gray-900">{order._id}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                            <UserCheck className="w-5 h-5 mt-1 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Supplier</p>
                                <p className="font-medium text-gray-900">{order.supplierId.name}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                            <Clock className="w-5 h-5 mt-1 text-gray-400" />
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
                            <DollarSign className="w-5 h-5 mt-1 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Total Amount</p>
                                <p className="font-medium text-gray-900">${order.totalAmount.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                        <h2 className="mb-4 text-lg font-medium text-gray-900">Order Items</h2>
                        <div className="overflow-hidden border border-gray-200 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            S.No
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Product
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Quantity
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {order.orderItems.map((item, index) => (
                                        <tr 
                                            key={index}
                                            className="transition-colors duration-200 hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                                {item.product.itemName}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
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