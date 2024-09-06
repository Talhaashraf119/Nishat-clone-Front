import React from 'react';
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-4">
            <h4 className="mb-3">Contact Us</h4>
            <p>21 Km Ferozpur Road Lahore Pakistan.</p>
            <p>nishatonline@nishatmills.com</p>
            <p>+92 (0)42 3810 3311</p>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <h4 className="mb-3">Information</h4>
            <ul className="list-unstyled">
  <li><a href="#" className="text-decoration-none">FAQs</a></li>
  <li><a href="#" className="text-decoration-none">Order Tracking</a></li>
  <li><a href="#" className="text-decoration-none">Store Locator</a></li>
  <li><a href="#" className="text-decoration-none">Contact Us</a></li>
  <li><a href="#" className="text-decoration-none">Return &amp; Exchange Policy</a></li>
</ul>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <h4 className="mb-3">Customer Services</h4>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none">FAQs</a></li>
              <li><a href="#"className="text-decoration-none">Order Tracking</a></li>
              <li><a href="#"className="text-decoration-none">Store Locator</a></li>
              <li><a href="#"className="text-decoration-none">Contact Us</a></li>
              <li><a href="#"className="text-decoration-none">Return &amp; Exchange Policy</a></li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <h4 className="mb-3">Newsletter Signup</h4>
            <p>Subscribe to our newsletter and get the latest updates.</p>
            <form className="d-flex">
              <input type="email" className="form-control me-2" placeholder="Your email address" />
              <button type="submit" className="btn btn-dark">Subscribe</button>
            </form>
            <div className="social-icons mt-3">
              <a href="#" className="text-dark me-3"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-dark me-3"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-dark"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
