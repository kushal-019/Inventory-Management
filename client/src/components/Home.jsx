import Login  from './Login';
import React from 'react'
import { useState } from "react";
import Signup from './Signup';
import Navbar from './Navbar';
const Home = () => {
    const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
          <Navbar/>
  { isLogin ? (
    <Login  onSwitch={() => setIsLogin(false)} />
  ) : (
    <Signup onSwitch={() => setIsLogin(true)} />
  )}
       {/* <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <Dashboard />
      </main>
    </div> */}
    </div>
  )
}

export default Home
