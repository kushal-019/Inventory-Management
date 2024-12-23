import React, { useEffect } from 'react';
import Navbar from './Navbar';
import About from './About';
const Home = () => {

    useEffect(() => { (async () => {
        const token = localStorage.getItem("authToken");
        if (!token ) {
          // alert("Please log in first.");
          // navigate('/');
          return;
        }
  
      })();
    }, []);
  return (<>
  <Navbar/>
  
    <div id='home' className="flex justify-center min-h-screen text-black bg-lightblue">
      <div className="w-[70%] bg-white p-8 shadow-lg rounded-lg">
        {/* Hero Section */}
        <div className="py-16 text-center">
          <h1 className="mb-6 text-5xl font-extrabold text-black">
            Welcome to <span className="text-midblue">Invento Mart</span>
          </h1>
          <p className="mb-8 text-lg text-black">
            Manage your inventory efficiently and shop with ease. Experience innovation and simplicity all in one place.
          </p>
          <button className="px-8 py-4 font-semibold text-white transition rounded-lg bg-midblue hover:bg-lightblue">
            Explore Now
          </button>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-3">
          <div className="p-6 bg-white border rounded-lg shadow border-lightblue">
            <h3 className="mb-4 text-2xl font-semibold text-black">Easy Inventory Management</h3>
            <p className="text-midblue">
              Simplify your operations with our user-friendly tools for tracking stock, sales, and orders.
            </p>
          </div>
          <div className="p-6 bg-white border rounded-lg shadow border-lightblue">
            <h3 className="mb-4 text-2xl font-semibold text-black">Seamless E-Commerce</h3>
            <p className="text-midblue">
              Enjoy a hassle-free shopping experience with smooth navigation and secure transactions.
            </p>
          </div>
          <div className="p-6 bg-white border rounded-lg shadow border-lightblue">
            <h3 className="mb-4 text-2xl font-semibold text-black">Customizable Solutions</h3>
            <p className="text-midblue">
              Tailor our platform to suit your business needs with versatile options and integrations.
            </p>
          </div>
        </div>
      </div>
    </div>
    <About/></>
  );
};

export default Home;
