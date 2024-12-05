import React, { useState, useEffect } from "react";
import RightSidebar from "./RightSidebar";

const Sidebar = ({ data }) => {
  const [req, setReq] = useState("");
  const [name, setName] = useState(data?.name || "");
  const [list, setList] = useState([
    { ferm: "Mayank Traders", gst: "123edfguik8765", products: [{ name: "Product 1", price: 500 }, { name: "Product 2", price: 700 }] },
    { ferm: "Shyam Lal", gst: "56yghok24rrf", products: [{ name: "Product 3", price: 300 }, { name: "Product 4", price: 800 }] },
  ]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!data) return;

    if (data.role === "Customer") {
      setReq("Retailer");
    } else if (data.role === "Retailer") {
      setReq("WholeSaler");
      setName(data.ferm || data.name);
    } else {
      setName(data.ferm || data.name);
    }
  }, [data]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <div className="flex flex-col w-[25vw] text-white bg-[#a4b6c2]">
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

        {/* List */}
        <nav className="flex-1 p-4 space-y-4 bg-white">
          <h2 className="text-[#1c618f] font-extrabold text-center text-2xl">{req}'s List</h2>
          <div className="max-h-[50vh] overflow-scroll">
            {list.map((item, index) => (
              <div
                key={index}
                className="mb-1 cursor-pointer font-serif hover:bg-[#e8eef2] text-[#08273e] pl-2"
                onClick={() => handleItemClick(item)}
              >
                <p className="text-xl">{item.ferm}</p>
                <p className="text-sm">{`GST No: ${item.gst}`}</p>
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* Right Sidebar */}
      <RightSidebar selectedItem={selectedItem} />
    </div>
  );
};

export default Sidebar;
