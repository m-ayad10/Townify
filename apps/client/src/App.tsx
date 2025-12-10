import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { Login } from "@/pages/Auth/Login";
import { SignUp } from "@/pages/Auth/SignUp";
import { OTP } from "./pages/Auth/Otp";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {  useDispatch } from "react-redux";
import { type AppDispatch } from "./Redux/stroe";
import { useEffect } from "react";
import { fetchUser } from "./Redux/Slice/Auth/AuthThunk";

function App() {
  const dispatch=useDispatch<AppDispatch>()
  useEffect(()=>{
    dispatch(fetchUser())
  },[])
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/auth/otp" element={<OTP />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
