import axios from "axios";
import React, { useState, useEffect } from "react";
import RightSidebar from "./RightSidebar";
const Sidebar = ({ data }) => {
  const [req, setReq] = useState("Customer");
  const [name, setName] = useState(data?.name || "");
  const [list, setList] = useState([
    { ferm: "Mayank Traders", gst: "123edfguik8765", products: [{ name: "Product 1", price: 500 }, { name: "Product 2", price: 700 }] },
    { ferm: "Shyam Lal", gst: "56yghok24rrf", products: [{ name: "Product 3", price: 300 }, { name: "Product 4", price: 800 }] },
    { ferm: "Mayank Traders", gst: "123edfguik8765", products: [{ name: "Product 1", price: 500 }, { name: "Product 2", price: 700 }] },
    { ferm: "Shyam Lal", gst: "56yghok24rrf", products: [{ name: "Product 3", price: 300 }, { name: "Product 4", price: 800 }] },
  ]);
 
  const [incomeExpense, setIncomeExpense] = useState({
    income: 150000,
    expense: 75000,
  });
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    if (!data) return;

    if (data.role === "Customer") {
      setReq("Retailer");
    } else if (data.role === "Retailer") {
      setReq("WholeSaler");
      setName(data.ferm || data.name);
    } else {
      setReq("Customer");
      setName(data.ferm || data.name);
    }
   
    // Example Axios Fetch (commented for demo)
    /*
    axios
      .get(`/api/${req}/list`)
      .then((res) => {
        setList(res.data.list);
      })
      .catch((e) => {
        console.error("Error fetching list:", e);
      });
    */
  }, [data]);

  return (
    <div className="flex">
    <div className="flex flex-col w-[25vw] text-white bg-[#a4b6c2]">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center p-2 border-[#1c618f] border-b-2 h-[35%]">
        <div className="flex items-center gap-7">
          {req === "Customer" && (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuWgg1mjdrrer5asSh0TiJKDkdg40UEHc3uw&s"
              alt="Profile"
              className="h-16 border-black rounded-full border-1"
            />
          )}
          <div className="pt-2 pb-2 text-4xl font-bold text-center">{name}</div>
        </div>
        <p className="text-white">Email: {data?.email}</p>
        {req !== "Customer" && data?.gst && (
          <p className="text-white">GST: {data.gst}</p>
        )}
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 p-4 space-y-4 bg-white">
        <h2 className="text-[#1c618f] font-extrabold text-center text-2xl">
          {req === "WholeSaler" ? "Income & Expenses" : `${req}'s List`}
        </h2>
        {req === "WholeSaler" ? (
          <div className="flex flex-col gap-4 text-[#08273e]">
            <div className="p-4 bg-[#e8eef2] rounded-md">
              <h3 className="text-xl font-bold">Income</h3>
              <p className="text-lg">{`₹${incomeExpense.income}`}</p>
            </div>
            <div className="p-4 bg-[#e8eef2] rounded-md">
              <h3 className="text-xl font-bold">Expenses</h3>
              <p className="text-lg">{`₹${incomeExpense.expense}`}</p>
            </div>
            <div className="p-4 bg-[#d1e7f2] rounded-md">
              <h3 className="text-xl font-bold">Net Profit</h3>
              <p className="text-lg">
                {`₹${incomeExpense.income - incomeExpense.expense}`}
              </p>
            </div>
          </div>
        ) : (
          <div className="max-h-[50vh] overflow-scroll">
            {list.map((item, index) => (
              <div
                key={index}
                className="mb-1 cursor-pointer font-serif hover:bg-[#e8eef2] text-[#08273e] pl-2"
                onClick={() =>setSelectedItem(item)}
              >
                <p className="text-xl">{item.ferm}</p>
                <p className="text-sm">{`GST No: ${item.gst}`}</p>
              </div>
            ))}
          </div>
        )}
      </nav>
    </div>
     <RightSidebar selectedItem={selectedItem} /></div>
  );
};

export default Sidebar;
