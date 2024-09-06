import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Addproducts from "./Pages/Products/Addproducts";
import Manager from "./Pages/Manager/Manager";
import Update from "./Pages/Products/update";
import Category from "./Pages/Category/Category";
import Addtocart from "./Pages/Addtocart/Addtocart";
import Sucess from "./Pages/Success/Sucess";
import Cancel from "./Pages/cancel/Cancel";
import Navbar from "./Component/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Footer from "./Component/Footer/Footer";
import Detailpage from "./Pages/Deatilpage/Detailpage";
import Checkout from "./Pages/Checkout/Checkout";

function App() {
  const islogin = JSON.parse(localStorage.getItem("loginfo"));
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/addproduct" element={<Addproducts />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/manager" element={islogin ? <Manager /> : <Navigate to="/"/>}
        />

        <Route path="/addtocart" element={<Addtocart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/detailpage/:id" element={<Detailpage />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/category/:role" element={<Category />} />
        <Route path="/success" element={<Sucess />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
