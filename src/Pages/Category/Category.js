import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContextCreate } from "../../Component/Contextapi/Context";
import "./cards.css";

const Category = () => {
  const [getdata, setgetdata] = useState([]);
  const [alldata, setalldata] = useState([]);
  const { role } = useParams();
  const { data, setdata } = useContext(ContextCreate);
  const {setdetaildata } = useContext(ContextCreate);


    const fetchdata = async () => {
      try {
        let result = await axios.get("http://localhost:5000/getdata");
        setgetdata(result.data.result);
        setalldata(result.data.result)
        // setdata(result.data.result)
        console.log(result.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    setdetaildata(alldata)


  const handleaddtocart = (item) => {
    // Check if item already exists in the cart
    const existingItem = data.find((cartItem) => cartItem._id === item._id);

    if (existingItem) {
      // Update quantity if item already in cart
      const updatedCart = data.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setdata(updatedCart);
      localStorage.setItem("Addtocart", JSON.stringify(updatedCart));
    } else {
      // Add new item to cart
      const updatedCart = [...data, { ...item, quantity: 1 }];
      setdata(updatedCart);
      localStorage.setItem("Addtocart", JSON.stringify(updatedCart));
    }
    console.log(data);
  };
  const handlesubmenu = (subcategory) => {
    if (subcategory) {
      const filtered = alldata.filter(
        (data) => data.subcategory === subcategory
      );
      setgetdata(filtered);
    } else {
      setgetdata(alldata);

    }
  };
  const handlesubmenuwomen=(category)=>{
    if (category) {
      const filtered = alldata.filter(
        (data) => data.subcategory === category
      );
      setgetdata(filtered);
    } else {
      setgetdata(alldata);

    }

  }
  const handlehome=(category)=>{
    if (category) {
      const filtered = alldata.filter(
        (data) => data.subcategory === category
      );
      setgetdata(filtered);
    } else {
      setgetdata(alldata);

    }

  }
  const handleaccessories=(category)=>{
    if (category) {
      const filtered = alldata.filter(
        (data) => data.subcategory === category
      );
      setgetdata(filtered);
    } else {
      setgetdata(alldata);

    }

  }
  useEffect(()=>{
    fetchdata()
  },[])

  return (
      <div>
        {role === "women" && (
          <div className="categories-container">
            <div className="category-card">
        <button onClick={() => handlesubmenuwomen("pret")}
                style={{ border: "none", backgroundColor: "white" }}
            ><img src="\pexels-dhanno-27603289.jpg" alt="Pret" />
            <p>Pret</p></button> 
          </div>
          <div className="category-card">
        <button onClick={() => handlesubmenuwomen("unstitched")}
              style={{ border: "none", backgroundColor: "white" }}
            >    <img src="/pexels-dhanno-27284032.jpg" alt="Unstitched" />
            <p>Unstitched</p></button>
          </div>
          <div className="category-card">
          <button onClick={() => handlesubmenuwomen("FTB")}
              style={{ border: "none", backgroundColor: "white" }}
            >     <img src="/pexels-dhanno-19401523.jpg" alt="FTB" />
            <p>FTB</p></button>
          </div>
          <div className="category-card">
          <button onClick={() => handlesubmenuwomen("Bottoms")}
              style={{ border: "none", backgroundColor: "white" }}
            >  <img src="/pexels-dhanno-19487610.jpg" alt="Bottoms" />
            <p>Bottoms</p></button>
          </div>
        </div>
      )}
      {role === "men" && (
        <div className="categories-container">
          <div className="category-card">
            <button
              onClick={() => handlesubmenu("cotton")}
              style={{ border: "none", backgroundColor: "white" }}
            >
              {" "}
              <img src="\42219487-_2.webp" alt="Pret" />
              <p>Cotton</p>
            </button>
          </div>
          <div className="category-card">
            <button
              onClick={() => handlesubmenu("unstitched")}
              style={{ border: "none", backgroundColor: "white" }}
            >
              {" "}
              <img src="\pexels-enginakyurt-1487809.jpg" alt="Unstitched" />
              <p>Unstitched</p>
            </button>
          </div>
        </div>
      )}
      {role === "home" && (
        <div className="categories-container">
          <div className="category-card">
            <button
              onClick={() => handlehome("badding")}
              style={{ border: "none", backgroundColor: "white" }}
            >
              {" "}
              <img src="\BBS24-06-_8.webp" alt="Pret" />
              <p>Badding</p>
            </button>
          </div>
          <div className="category-card">
            <button
              onClick={() => handlehome("cushion")}
              style={{ border: "none", backgroundColor: "white" }}
            >
              {" "}
              <img src="\MUNRO-PINK.webp" alt="Unstitched" />
              <p>Cushion</p>
            </button>
          </div>
          <div className="category-card">
            <button
              onClick={() => handlehome("tableline")}
              style={{ border: "none", backgroundColor: "white" }}
            >
              {" "}
              <img src="\Dusk-Greentablerunner (1).webp" alt="Unstitched" />
              <p>Table Line</p>
            </button>
          </div>
        </div>
      )}
      {role === "accessories" && (
        <div className="categories-container">
          <div className="category-card">
            <button
              onClick={() => handleaccessories("bags")}
              style={{ border: "none", backgroundColor: "white" }}
            >
              {" "}
              <img src="/000436512104-_1.webp" alt="Pret" />
              <p>Bags</p>
            </button>
          </div>
          <div className="category-card">
            <button
              onClick={() => handleaccessories("wraps")}
              style={{ border: "none", backgroundColor: "white" }}
            >
              {" "}
              <img src="\000436822124.webp" alt="Unstitched" />
              <p>Wraps</p>
            </button>
          </div>
          
        </div>
      )}
      <div className="card-container">
        {Array.isArray(getdata) && (
          <>
            {role === "men" &&
              getdata
                .filter((item) => item.category === "men")
                .map((item, index) => (
                  <div key={index} className="card">
               <Link to={`/detailpage/${item._id}`}>    <img
                      src={`http://localhost:5000/${item.image}`}
                      alt={item.name}
                      className="card-image"
                    /></Link> 
                    <div className="card-content">
                      <h2 className="card-title">{item.name}</h2>
                      <p className="card-price">{item.price}</p>
                    </div>
                    <button
                      className="card-button"
                      onClick={() => handleaddtocart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}

            {role === "women" &&
              getdata
                .filter((item) => item.category === "women")
                .map((item, index) => (
                  <div key={index} className="card">
                     <Link to={`/detailpage/${item._id}`}>    <img
                      src={`http://localhost:5000/${item.image}`}
                      alt={item.name}
                      className="card-image"
                    /></Link>
                    <div className="card-content">
                      <h2 className="card-title">{item.name}</h2>
                      <p className="card-price">{item.price}</p>
                    </div>
                    <button
                      className="card-button"
                      onClick={() => handleaddtocart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
            {role === "home" &&
              getdata
                .filter((item) => item.category === "home")
                .map((item, index) => (
                  <div key={index} className="card">
                    <Link to={`/detailpage/${item._id}`}>    <img
                      src={`http://localhost:5000/${item.image}`}
                      alt={item.name}
                      className="card-image"
                    /></Link>
                    <div className="card-content">
                      <h2 className="card-title">{item.name}</h2>
                      <p className="card-price">{item.price}</p>
                    </div>
                    <button
                      className="card-button"
                      onClick={() => handleaddtocart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}

            {role === "accessories" &&
              getdata
                .filter((item) => item.category === "accessories")
                .map((item, index) => (
                  <div key={index} className="card">
                     <Link to={`/detailpage/${item._id}`}>    <img
                      src={`http://localhost:5000/${item.image}`}
                      alt={item.name}
                      className="card-image"
                    /></Link>
                    <div className="card-content">
                      <h2 className="card-title">{item.name}</h2>
                      <p className="card-price">{item.price}</p>
                    </div>
                    <button
                      className="card-button"
                      onClick={() => handleaddtocart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Category;
