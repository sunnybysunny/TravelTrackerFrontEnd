// import logo from "./logo.svg";
import axios from "axios";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import AddPin from "./components/AddPin";
// import GoogleMap from "./components/GoogleMap";
// import MainPage from "./components/Settings";
// import PinInfo from "./components/PinInfo";
// import Settings from "/components/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/profiles/profile_id" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
