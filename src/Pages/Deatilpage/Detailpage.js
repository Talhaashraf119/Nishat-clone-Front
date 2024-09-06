import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ContextCreate } from '../../Component/Contextapi/Context';
import './Detailpage.css'; // Assuming you have a CSS file for styling

const Detailpage = () => {
    const { detaildata, data, setdata } = useContext(ContextCreate);
    const { id } = useParams();
    const [itemData, setItemData] = useState(null);
    const [quantity, setQuantity] = useState(1); // For managing quantity
    const mainImageContainerRef = useRef(null);
    const zoomableImageRef = useRef(null);

    useEffect(() => {
        if (detaildata && detaildata.length > 0) {
            const item = detaildata.find((item) => item._id === id);
            setItemData(item);
        }
    }, [detaildata, id]);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    const handleaddtocart = () => {
        if (!itemData) return;

        const existingItem = data.find((cartItem) => cartItem._id === itemData._id);

        if (existingItem) {
            // Update quantity if item already in cart
            const updatedCart = data.map((cartItem) =>
                cartItem._id === itemData._id
                    ? { ...cartItem, quantity: cartItem.quantity + quantity }
                    : cartItem
            );
            setdata(updatedCart);
            localStorage.setItem("Addtocart", JSON.stringify(updatedCart));
        } else {
            // Add new item to cart
            const updatedCart = [...data, { ...itemData, quantity }];
            setdata(updatedCart);
            localStorage.setItem("Addtocart", JSON.stringify(updatedCart));
        }
    };

    // Zoom functionality
    const handleMouseMove = (event) => {
        const mainImageContainer = mainImageContainerRef.current;
        const zoomableImage = zoomableImageRef.current;

        const rect = mainImageContainer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        zoomableImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        zoomableImage.style.transform = "scale(2)";
    };

    const handleMouseLeave = () => {
        zoomableImageRef.current.style.transform = "scale(1)";
    };

    if (!itemData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-container">
           
            <div
                className="main-image-container"
                ref={mainImageContainerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ overflow: 'hidden', position: 'relative' }}
            >
                <img
                    src={`http://localhost:5000/${itemData.image}`}
                    alt={`Product ${itemData.name}`}
                    className="zoomable-image"
                    ref={zoomableImageRef}
                    style={{ width: '100%', transition: 'transform 0.3s ease' }}
                />
            </div>
            <div className="product-details">
                <h1>{itemData.name}</h1>
                <p className="price">{itemData.price}</p>
                <div className="add-to-cart-container">
                    <button onClick={decreaseQuantity} className="quantity-control">-</button>
                    <span className="quantity">{quantity}</span>
                    <button onClick={increaseQuantity} className="quantity-control">+</button>
                    <button onClick={handleaddtocart} className="add-to-cart">Add to Cart</button>
                </div>
                <div className="tabs-container">
                    <button className="tab-button active" data-tab="description">Description</button>
                    <button className="tab-button" data-tab="reviews">Reviews</button>
                    <div className="tab-content active" id="description">
                        <p>{itemData.description}</p>
                    </div>
                    <div className="tab-content" id="reviews">
                        {/* Reviews will be here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detailpage;
