import React, { useState } from 'react';
import Swal from "sweetalert2";
import axios from "axios";
import "./addproduct.css";

const Addproducts = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
    subcategory: "",
    photo: null,
  });

  const handleInputChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormdata({
      ...formdata,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", formdata.name);
    formData.append("price", formdata.price);
    formData.append("description", formdata.description);
    formData.append("stock", formdata.stock);
    formData.append("category", formdata.category);
    formData.append("subcategory", formdata.subcategory);
    formData.append("photo", formdata.photo);

    try {
      const response = await axios.post("http://localhost:5000/addproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Product Added Successfully",
        });
        setFormdata({
          name: "",
          price: "",
          description: "",
          stock: "",
          category: "",
          subcategory: "",
          photo: null,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Add Product",
          footer: response.data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Technical Issues",
        footer: "Please try again later",
      });
    }
  };

  const categoryOptions = {
    women: ['pret', 'unstitched', 'FTB', 'Bottoms'],
    men: ['cotton', 'untitched'],
    home: ['bedding', 'cushion', 'tableline'],
    accessories: ['bags', 'wraps'],
  };

  return (
    <div className="add-products-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-products-form">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formdata.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Product Category</label>
          <select
            id="category"
            name="category"
            value={formdata.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="home">Home</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="subcategory">Sub Category</label>
          <select
            id="subcategory"
            name="subcategory"
            value={formdata.subcategory}
            onChange={handleInputChange}
            required
            disabled={!formdata.category} // Disable if no category is selected
          >
            <option value="">Select Subcategory</option>
            {formdata.category &&
              categoryOptions[formdata.category].map((subcat) => (
                <option key={subcat} value={subcat.toLowerCase()}>
                  {subcat}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formdata.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formdata.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formdata.stock}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">Product Image</label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" className="add-product-btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Addproducts;
