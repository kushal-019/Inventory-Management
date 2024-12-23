import React, { useState } from 'react'

const RetailerList = ({onSelectRetailer}) => {
    const [suppliers,setSuppliers]=useState([
        {
        "_id":"id",
        "businessName":"Jai Traders",
        "gst":"@#12345678",
        "name":"prakash jain"
    },
        {
        "_id":"id",
        "businessName":"Jai Traders",
        "gst":"@#12345678",
        "name":"prakash jain"
    },
        {
        "_id":"id",
        "businessName":"Jai Traders",
        "gst":"@#12345678",
        "name":"prakash jain",
        "products": [
            { id: 1, name: "Product X", price: 500, description: "High-quality item for everyday use", stock: 10 },
            { id: 2, name: "Product Y", price: 300, description: "Durable and reliable product", stock: 20 },
            { id: 1, name: "Product 1", price: 500, description: "High-quality item for everyday use", stock: 10 },
            { id: 2, name: "Product 2", price: 300, description: "Durable and reliable product", stock: 20 },
            { id: 1, name: "Product 3", price: 500, description: "High-quality item for everyday use", stock: 10 },
            { id: 2, name: "Product 3", price: 300, description: "Durable and reliable product", stock: 20 },
            { id: 1, name: "Product 4", price: 500, description: "High-quality item for everyday use", stock: 10 },
            { id: 2, name: "Product Y", price: 300, description: "Durable and reliable product", stock: 20 },
            { id: 1, name: "Product X", price: 500, description: "High-quality item for everyday use", stock: 10 },
            { id: 2, name: "Product Y", price: 300, description: "Durable and reliable product", stock: 20 },
            { id: 1, name: "Product X", price: 500, description: "High-quality item for everyday use", stock: 10 },
            { id: 2, name: "Product Y", price: 300, description: "Durable and reliable product", stock: 20 },
            { id: 1, name: "Product X", price: 500, description: "High-quality item for everyday use", stock: 10 },
            { id: 2, name: "Product Y", price: 300, description: "Durable and reliable product", stock: 20 },
          ],
    },
        {
        "_id":"id",
        "businessName":"Jai Traders",
        "gst":"@#12345678",
        "name":"prakash jain",
        "products": [
            { id: 1, name: "Product X", price: 500, description: "High-quality item for everyday use", stock: 10 },
            { id: 2, name: "Product Y", price: 300, description: "Durable and reliable product", stock: 20 },
          ],
    },
]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchSupplier = async () => {
    //         try {
    //             const response = await axios.get("https://localhost:3000/api/v1/supplier");
    //             setSuppliers(response.data.suppliers || []);
    //         } catch (err) {
    //             console.error("Error fetching Suppliers:", err);
    //             setError("Failed to load Suppliers list. Please try again.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchSupplier();
    // }, []);

    // if (loading) {
    //     return <p className="font-semibold ">Loading Suppliers List...</p>;
    // }

    // if (error) {
    //     return <p className="text-red-500">{error}</p>;
    // }


  return (
    <div>
      <h1 className="mb-4 text-4xl font-bold text-center text-midblue">Suppliers List</h1>
      {suppliers.length === 0 ? (
                <p className="text-4xl font-bold text-dark">No Suppliers found.</p>
            ) : (
                <div className="space-y-4 overflow-y-scroll max-h-[75vh]">
                    {suppliers.map((supplier) => (
                        <div
                            key={supplier._id}
                            className="p-4 border-2 border-black rounded-lg shadow-2xl cursor-pointer hover:border-midblue shadow-midblue hover:bg-dark hover:text-white "
                            onClick={() => onSelectRetailer(supplier)}
                        >
                            <h3 className="text-2xl font-bold text-lightblue">{supplier.businessName}</h3>
                            <div className="flex justify-between text-xl font-semibold">
                                <p className="text-xl font-semibold">GST No: {supplier.gst}</p>
                                <p>Owner : {supplier.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
    </div>
  )
}

export default RetailerList

  