import Login  from './Login';
import React from 'react'
import { useState } from "react";
import Signup from './Signup';
const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
  { isLogin ? (
    <Login  onSwitch={() => setIsLogin(false)} />
  ) : (
    <Signup onSwitch={() => setIsLogin(true)} />
  )}
     
    </div>
  )
}

export default Auth;
