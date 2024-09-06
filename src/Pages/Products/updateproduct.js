import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Updateproduct = () => {
  const [viewproduct, setviewproduct] = useState([]);
  const [allproducts, setallproducts] = useState([]);
  const [search, setsearch] = useState("");

  const viewdata = async () => {
    try {
      let result = await axios.get("http://localhost:5000/getdata");
      setviewproduct(result.data.result);
      setallproducts(result.data.result); // This line ensures that allproducts holds the full product list
      console.log(result.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteitem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      setviewproduct(viewproduct.filter((data) => data._id !== id));
      setallproducts(allproducts.filter((data) => data._id !== id)); // Update allproducts as well
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    const searchitem = e.target.value.toLowerCase();
    setsearch(searchitem);
    const filtereddata = allproducts.filter(
      (data) =>
        data.name.toLowerCase().includes(searchitem) ||
        data.category.toLowerCase().includes(searchitem)
    );
    setviewproduct(filtereddata); // Correct state update for filtered data
  };

  const handlebutton = (category) => {
    if (category) {
      const buttondata = allproducts.filter((data) => data.category === category);
      setviewproduct(buttondata); // Use allproducts for filtering
    } else {
      setviewproduct(allproducts); // Show all products when category is empty
    }
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
    <div className="product-container"> {/* Use the same container class */}
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
              /> {/* Use the same card class */}
            <h3 className="product-name">{data.name}</h3>
            <p className="product-description">{data.description}</p>
            <p className="product-price">{data.price}</p>
            <p className="product-stock">Stock: {data.stock}</p>
            <p className="product-category">Category: {data.category}</p>
            <p className="product-category">Sub Category: {data.subcategory}</p>
            <button className="action-button" onClick={() => deleteitem(data._id)}>Delete</button> {/* Action button class */}
            <Link to={`/update/${data._id}`}>
              <button className="action-button">Update</button> {/* Action button class */}
            </Link>
          </div>
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
    </div>
  );
};
export default Updateproduct;
