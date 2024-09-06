import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ContextCreate } from '../Contextapi/Context';
import './navbar.css'; // Ensure Bootstrap CSS is imported

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(""); // New state for OTP form
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false); // New state for change password form
  const [logininfo, setlogininfo] = useState({ email: "", password: "" });
  const [Email, setEmail] = useState(""); // New state for forgot password
  const [otp, setOtp] = useState(""); // State for OTP
  const [newPassword, setNewPassword] = useState(""); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const { data } = useContext(ContextCreate);
  const navigate = useNavigate();

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
    setIsRegister(false);
    setIsForgotPasswordOpen(false);
    setIsOtpOpen(false); // Ensure OTP form is closed
    setIsChangePasswordOpen(false); // Ensure change password form is closed
  };

  const toggleRegister = () => {
    setIsRegister(true);
    setIsForgotPasswordOpen(false);
    setIsOtpOpen(false);
    setIsChangePasswordOpen(false);
  };

  const toggleForgotPassword = () => {
    setIsForgotPasswordOpen(true);
    setIsRegister(false);
    setIsOtpOpen(false);
    setIsChangePasswordOpen(false);
  };

  const toggleOtp = () => {
    setIsOtpOpen(true);
    setIsForgotPasswordOpen(false);
    setIsChangePasswordOpen(false);
  };

  const toggleChangePassword = () => {
    setIsChangePasswordOpen(true);
    setIsOtpOpen(false);
  };

  const handellogin = (e) => {
    setlogininfo({ ...logininfo, [e.target.name]: e.target.value });
  };

  const loginform = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post("http://localhost:5000/login", logininfo);

      if (result) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          footer: result.data.message
        });
        setlogininfo({ email: "", password: "" });
        setIsLoginOpen(false);
        navigate('/manager');
        localStorage.setItem("loginfo", true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          footer: result.data.message
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        footer: "Technical issues"
      });
    }
  };

  const randomnumber = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const emailsubmit = async (e) => {
    e.preventDefault();
    const optp = randomnumber();
    setGeneratedOtp(optp)
    console.log("the first otp ",optp)
    try {
      let result = await axios.post("http://localhost:5000/getemail", { email: logininfo.email, otp: optp });
      setEmail("");
      setIsForgotPasswordOpen(false);
      toggleOtp(); // Open OTP form after sending the email
    } catch (error) {
      setIsLoginOpen(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        footer: "Could not send password reset email. Please try again."
      });
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    
    console.log("the second optp",generatedOtp)// Generate OTP for verification
    if (otp === generatedOtp.toString()) {
      setIsChangePasswordOpen(true);
      setIsOtpOpen(false); 
    } else {
      setIsOtpOpen(false); 
      Swal.fire({
        icon: "error",
        title: "Incorrect OTP",
        footer: "Recheck the OTP and try again"
      });
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setIsChangePasswordOpen(false);
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        footer: "Passwords do not match. Please try again."
      });
      return;
    }
    try {
      let result = await axios.put("http://localhost:5000/resetpass", { email: logininfo.email, newPassword });
      if (result) {
      
        setIsChangePasswordOpen(false);
        setIsLoginOpen(true); // Return to login after successful password change
      } else {
        setIsChangePasswordOpen(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          footer: "Could not change password. Please try again."
        });
      }
    } catch (error) {
      setIsChangePasswordOpen(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        footer: "Technical issues"
      });
    }
  };

  return (
    <div>
      <header className="home-header fixed-top bg-white border-bottom py-2">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
          <div className="home-logo text-center">
            <Link to={'/'}>
              <img src="/final_logo_1_nishat-golden.webp" alt="Nishat Logo" className="img-fluid" />
            </Link>
          </div>
          <div className="home-icons d-flex align-items-center mt-2 mt-md-0">
            <Link to="#" className="mx-2">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
            <Link to="#" className="mx-2" onClick={toggleLogin}>
              <i className="fa-regular fa-user"></i>
            </Link>
            <Link to="#" className="mx-2">
              <i className="fa-solid fa-truck"></i>
            </Link>
            <Link to="/addtocart" className="mx-2 position-relative">
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                {data.length}
              </span>
            </Link>
          </div>
        </div>
        <nav className="home-nav border-top py-2">
          <div className="container">
            <ul className="nav justify-content-center list-unstyled mb-0">
              <li className="nav-item"><Link className="nav-link" to={`/category/${"women"}`}>NEW IN</Link></li>
              <li className="nav-item"><Link className="nav-link" to={`/category/${"women"}`}>WOMEN</Link></li>
              <li className="nav-item"><Link className="nav-link" to={`/category/${"women"}`}>LUXURY</Link></li>
              <li className="nav-item"><Link className="nav-link" to={`/category/${"men"}`}>MEN</Link></li>
              <li className="nav-item"><Link className="nav-link" to={`/category/${"home"}`}>HOME</Link></li>
              <li className="nav-item"><Link className="nav-link" to={`/category/${"accessories"}`}>ACCESSORIES</Link></li>
              <li className="nav-item"><Link className="nav-link text-warning" to="#">SUMMER SALE</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      <div className={`overlay ${isLoginOpen ? "active" : ""}`} onClick={toggleLogin}></div>
      <div className={`login-form-container ${isLoginOpen ? "active" : ""}`}>
        <div className="login-form p-3">
          <button className="close-btn btn btn-link text-dark" onClick={toggleLogin}>✕</button>
          {isRegister ? (
            <>
              <h2>REGISTER</h2>
              <form>
                <div className="mb-3">
                  <label className="form-label">Full Name <span>*</span></label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email <span>*</span></label>
                  <input type="email" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password <span>*</span></label>
                  <input type="password" className="form-control" required />
                </div>
                <button type="submit" className="btn btn-dark w-100">Register</button>
                <p>Already have an account? <a href="#" onClick={toggleLogin}>Login</a></p>
              </form>
            </>
          ) : isForgotPasswordOpen ? (
            <>
              <h2>FORGOT PASSWORD</h2>
              <form onSubmit={emailsubmit}>
                <div className="mb-3">
                  <label className="form-label">Email <span>*</span></label>
                  <input
                    type="email"
                    className="form-control"
                    value={logininfo.email}
                    onChange={(e) => setlogininfo({ ...logininfo, email: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-dark w-100">Submit</button>
                <p>Back to <a href="#" onClick={toggleLogin}>Login</a></p>
              </form>
            </>
          ) : isOtpOpen ? (
            <>
              <h2>VERIFY OTP</h2>
              <form onSubmit={verifyOtp}>
                <div className="mb-3">
                  <label className="form-label">OTP <span>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-dark w-100">Verify OTP</button>
                <p>Back to <a href="#" onClick={toggleForgotPassword}>Forgot Password</a></p>
              </form>
            </>
          ) : isChangePasswordOpen ? (
            <>
              <h2>CHANGE PASSWORD</h2>
              <form onSubmit={changePassword}>
                <div className="mb-3">
                  <label className="form-label">New Password <span>*</span></label>
                  <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password <span>*</span></label>
                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-dark w-100">Change Password</button>
                <p>Back to <a href="#" onClick={toggleLogin}>Login</a></p>
              </form>
            </>
          ) : (
            <>
              <h2>LOGIN</h2>
              <form onSubmit={loginform}>
                <div className="mb-3">
                  <label className="form-label">Email <span>*</span></label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={logininfo.email}
                    onChange={handellogin}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password <span>*</span></label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={logininfo.password}
                    onChange={handellogin}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-dark w-100">Login</button>
                <p>
                  Don't have an account? <a href="#" onClick={toggleRegister}>Register</a>
                </p>
                <p>
                  Forgot your password? <a href="#" onClick={toggleForgotPassword}>Reset Password</a>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
