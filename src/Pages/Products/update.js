import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./update.css";
const UpdateProduct = () => {
  const [formdata, setformdata] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    category: '',
    subcategory: '',
    photo: null,
  });
  const {id}=useParams()
 const navigate= useNavigate()



  // Fetch product details for the given productId
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const result = await axios.get(`http://localhost:5000/getdata/${id}`);
        const product = result.data.result;
        setformdata({
          name: product.name,
          price: product.price,
          description: product.description,
          stock: product.stock,
          category: product.category,
          subcategory: product.subcategory,
          photo: null, 
        });
      } catch (error) {
        console.log('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleInputChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setformdata({
      ...formdata,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = new FormData();
    updatedFormData.append('name', formdata.name);
    updatedFormData.append('price', formdata.price);
    updatedFormData.append('description', formdata.description);
    updatedFormData.append('stock', formdata.stock);
    updatedFormData.append('category', formdata.category);
    updatedFormData.append('subcategory', formdata.subcategory);
    if (formdata.photo) {
      updatedFormData.append('photo', formdata.photo);
    }

    try {
      const response = await axios.put(`http://localhost:5000/updateproduct/${id}`, updatedFormData);
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Product Updated Successfully',
        });
        navigate('/manager')
        
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Update Product',
          footer: response.data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Technical Issues',
        footer: 'Please try again later',
      });
    }
  };

  return (
    <div className="update-product-container">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit} className="update-product-form">
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
          <input
            type="text"
            id="category"
            name="category"
            value={formdata.category}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subcategory">Sub Category</label>
          <input
            type="text"
            id="subcategory"
            name="subcategory"
            value={formdata.subcategory}
            onChange={handleInputChange}
            required
          />
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
          />
        </div>
        <button type="submit" className="update-product-btn">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
