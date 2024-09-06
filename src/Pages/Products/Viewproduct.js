import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ViewProduct.css"; // Assuming you have a CSS file for styling

const Viewproduct = () => {
  const [viewproduct, setviewproduct] = useState([]);
  const [allproducts, setallproducts] = useState([]);
  const [search, setsearch] = useState("");

  const viewdata = async () => {
    try {
      let result = await axios.get("http://localhost:5000/getdata");
      setviewproduct(result.data.result);
      setallproducts(result.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle category filter
  const handlebutton = (category) => {
    if (category) {
      const buttondata = allproducts.filter((data) => data.category.toLowerCase() === category.toLowerCase());
      setviewproduct(buttondata);
    } else {
      setviewproduct(allproducts); // Show all products if no category is selected
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setsearch(searchTerm);
    const filtereddata = allproducts.filter(
      (data) =>
        data.name.toLowerCase().includes(searchTerm) ||
        data.category.toLowerCase().includes(searchTerm)
    );
    setviewproduct(filtereddata);
  };

  useEffect(() => {
    viewdata();
  }, []);

  return (
    <div>
      <input
        value={search}
        onChange={handleSearch}
        placeholder="Search items"
        className="search-bar" // Add a class for styling
      />
      <div className="Category-button">
        <button onClick={() => handlebutton("men")}>Men</button>
        <button onClick={() => handlebutton("women")}>Women</button>
        <button onClick={() => handlebutton("home")}>Home</button>
        <button onClick={() => handlebutton("accessories")}>Accessories</button>
        <button onClick={() => handlebutton("")}>Show All</button> {/* Button to show all products */}
      </div>
      <div className="product-container">
        {Array.isArray(viewproduct) && viewproduct.length > 0 ? (
          viewproduct.map((data) => (
            <div key={data._id} className="product-card">
              <img
                src={
                  data.image
                    ? `http://localhost:5000/${data.image}`
                    : "path/to/placeholder-image.jpg"
                }
                alt={data.name}
              />
              <h3 className="product-name">{data.name}</h3>
              <p className="product-description">{data.description}</p>
              <p className="product-price">{data.price}</p>
              <p className="product-stock">Stock: {data.stock}</p>
              <p className="product-category">Category: {data.category}</p>
              <p className="product-category">
                Sub Category: {data.subcategory}
              </p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Viewproduct;
