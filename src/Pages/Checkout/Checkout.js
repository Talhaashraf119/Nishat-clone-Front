import React, { useState } from "react";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import "./checkout.css";

function Checkout() {
  const [emailinfo, setemailinfo] = useState({
    email: "",
    city: "",
    country: "Pakistan",
    firstName: "",
    lastName: "",
    address: "",
    postalcode: "",
    phone: "",
    newsletter: false,
  });
  
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const data = JSON.parse(localStorage.getItem("Addtocart")) || [];

  const totalPrice = data.reduce((accumulator, item) => {
    const priceValue = Number(item.price.replace(/[^0-9.-]+/g, ""));
    const itemTotal = priceValue * item.quantity;
    return accumulator + itemTotal;
  }, 0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setemailinfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const sendinformation = async () => {
    const products = data.map(item => ({
        image: `http://localhost:5000/${item.image}`,
        title: item.title,
        size: item.size,
        color: item.color,
        price: item.price,
        quantity: item.quantity
    }));

    try {
        const response = await fetch("http://localhost:5000/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailinfo.email,
                firstName: emailinfo.firstName,
                lastName: emailinfo.lastName,
                address: emailinfo.address,
                city: emailinfo.city,
                country: emailinfo.country,
                postalcode: emailinfo.postalcode,
                phone: emailinfo.phone,
                products: products,
            }),
        });
        const data = await response.json();
        Swal.fire({
            icon: "success",
            title: "Email Sent Successfully",
            footer: data.message
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error Sending Email",
            footer: error.message
        });
    }
  };

  const makepayment = async () => {
    try {
      const stripe = await loadStripe("pk_test_51PqvGlP2haiv42fTbK0NjdiHAu2n299Ql8fM1RCYCCxYb8aDR6hksXFiInblC1fgQe2gkzOw7A16txfFssAPPROZ00WwAzGvP0");
      const body = { products: data };
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetch("http://localhost:5000/checkout", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error('Failed to create payment session');
      }
      const done = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: done.id,
      });
      if (result.error) {
        console.error("Stripe error:", result.error.message);
        alert("Payment error: " + result.error.message);
      }
    } catch (error) {
      console.error("Payment process error:", error);
      alert("Payment process failed. Please try again.");
    }
  };

  const handleOrderCompletion = () => {
    if (paymentMethod === "COD") {
      sendinformation();
    } else {
      makepayment();
    }
  };

  return (
    <div className="checkout-container">
      <div className="left-section">
        {/* Contact Section */}
        <div className="contact">
          <h2>Contact</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-field email-input"
            value={emailinfo.email}
            onChange={handleInputChange}
          />
          <p className="error-message">{!emailinfo.email && "Enter an email"}</p>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              checked={emailinfo.newsletter}
              onChange={handleInputChange}
            />
            <label htmlFor="newsletter">Email me with news and offers</label>
          </div>
        </div>
  
        {/* Delivery Section */}
        <div className="delivery">
          <h2>Delivery</h2>
          <select
            name="city"
            className="input-field"
            value={emailinfo.city}
            onChange={handleInputChange}
          >
            <option value="lahore">Lahore</option>
            <option value="karachi">Karachi</option>
            <option value="faisalabad">Faisalabad</option>
            <option value="multan">Multan</option>
            <option value="qasur">Qasur</option>
            <option value="rawalpindi">Rawalpindi</option>
          </select>
          <input
            type="text"
            value={emailinfo.country}
            name="country"
            className="input-field"
            readOnly
          />
          <div className="name-fields">
            <input
              type="text"
              placeholder="First name"
              className="input-field"
              name="firstName"
              value={emailinfo.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Last name"
              className="input-field"
              name="lastName"
              value={emailinfo.lastName}
              onChange={handleInputChange}
            />
          </div>
          <input
            type="text"
            placeholder="Address"
            className="input-field"
            name="address"
            value={emailinfo.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Apartment, suite, etc. (optional)"
            className="input-field"
          />
          <input
            type="text"
            placeholder="City"
            className="input-field"
            name="city"
            value={emailinfo.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Postal code (optional)"
            className="input-field"
            name="postalcode"
            value={emailinfo.postalcode}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Phone"
            className="input-field"
            name="phone"
            value={emailinfo.phone}
            onChange={handleInputChange}
          />
          <div className="checkbox-container">
            <input type="checkbox" id="save-info" />
            <label htmlFor="save-info">
              Save this information for next time
            </label>
          </div>
        </div>
  
        {/* Shipping Method Section */}
        <div className="shipping">
          <h2>Shipping method</h2>
          <div className="shipping-option">
            <label>
              <input type="radio" name="shipping" defaultChecked />
              Standard
            </label>
            <span>Rs 99.00</span>
          </div>
        </div>
  
        {/* Payment Section */}
        <div className="payment">
          <h2>Payment</h2>
          <p>All transactions are secure and encrypted.</p>
          <div className="payment-option">
            <label>
              <input
                type="radio"
                name="payment"
                value="Card"
                onChange={handlePaymentMethodChange}
              />
              Debit - Credit Card
            </label>
            <div className="payment-icons">
              <img src="https://via.placeholder.com/20x12" alt="Visa" />
              <img src="https://via.placeholder.com/20x12" alt="MasterCard" />
            </div>
          </div>
          <div className="payment-option">
            <label>
              <input
                type="radio"
                name="payment"
                value="COD"
                defaultChecked
                onChange={handlePaymentMethodChange}
              />
              Cash on Delivery (COD)
            </label>
          </div>
        </div>
  
        {/* Billing Address Section */}
        <div className="billing">
          <h2>Billing address</h2>
          <div className="billing-option">
            <label>
              <input type="radio" name="billing" defaultChecked />
              Same as shipping address
            </label>
          </div>
          <div className="billing-option">
            <label>
              <input type="radio" name="billing" />
              Use a different billing address
            </label>
          </div>
        </div>
  
        {/* Note Section */}
        <div className="note">
          <p>
            Note: You may receive multiple packages for items in your order.
          </p>
        </div>
  
        {/* Continue Button Section */}
        <div className="continue-button">
          <button type="button" onClick={handleOrderCompletion}>
            {paymentMethod === "COD" ? "Complete Order" : "Pay Now"}
          </button>
        </div>
      </div>
  
      {/* Order Summary Section */}
      <div className="right-section">
        <div className="order-summary">
          {data.length > 0 &&
            data.map((item, index) => (
              <div className="order-item" key={index}>
                <div className="item-image">
                  <img src={`http://localhost:5000/${item.image}`} alt="Item" />
                  <span className="item-quantity">{item.quantity}</span>
                </div>
                <div className="item-details">
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </div>
              </div>
            ))}
  
          <div className="discount-code">
            <input
              type="text"
              placeholder="Discount code"
              className="input-field"
            />
            <button>Apply</button>
          </div>
  
          <div className="total-section">
            <div className="price-breakdown">
              <p>Subtotal</p>
              <p>Rs {totalPrice}</p> {/* Replace with dynamic calculation */}
            </div>
            <div className="price-breakdown">
              <p>Shipping</p>
              <p>Rs 99.00</p>
            </div>
            <div className="price-breakdown total">
              <p>Total</p>
              <p>PKR Rs {totalPrice + 99}</p> {/* Dynamic total calculation */}
            </div>
            <p className="tax-info">Including Rs 501.86 in taxes</p>{" "}
            {/* Dynamic tax information */}
          </div>
        </div>
      </div>
    </div>
  );
  ;
}

export default Checkout;
