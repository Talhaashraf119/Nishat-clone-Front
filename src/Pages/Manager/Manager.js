import React, { useState } from 'react'
import Addproducts from '../Products/Addproducts'
import Viewproduct from '../Products/Viewproduct'
import Updateproduct from '../Products/updateproduct'
import "./manager.css"
import { useNavigate } from 'react-router-dom'

const Manager = () => {
    const [activetab,setactivetab]=useState("add")
    const navigate=useNavigate()

    const logout=()=>{
      localStorage.removeItem("loginfo")
      navigate('/')


    }
  return (
    <div>
 <div className="product-manager-container">
      <div className="product-manager-buttons">
        <button onClick={() => setactivetab("add")}>Add Product</button>
        <button onClick={() => setactivetab("view")}>View Products</button>
        <button onClick={() => setactivetab("updateDelete")}>Update/Delete Product</button>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="product-manager-content">
        {activetab==="add" && <Addproducts/>}
        {activetab==="view" && <Viewproduct/>}
        {activetab==="updateDelete" && <Updateproduct/>}
        </div>
        </div>
    </div>
  )
}

export default Manager