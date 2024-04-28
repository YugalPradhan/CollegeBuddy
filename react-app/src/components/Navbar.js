import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = () => {
  const [temp, setTemp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const categories = ["Bicycle", "Cooler", "Induction", "Kettle", "Books", "Exam Papers/Assignments", "Heater", "Mattress/Pillows", "Phone/Tab/Electronics", "Others"];
  const search = ["bicycle", "cooler", "induction", "kettle", "book", "exam", "heater", "mattress", "phone", "others"];

  const handleClick = (index) => {
    navigate(`/shop?keyword=${search[index]}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">CollegeBuddy</h1>
        {path.includes("shop") && (
          <form className="search-form" onSubmit={(e) => { e.preventDefault(); navigate(`/shop?keyword=${temp}`) }}>
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
            />
            <button type="submit" className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </form>
        )}
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={path === '/' ? "nav-links path" : "nav-links"}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/shop" className={path === "/shop" || path.includes("productdetails") ? "nav-links path" : "nav-links"}>Shop</Link>
          </li>
          <li className="nav-item dropdown">
            <span className="nav-links">Categories</span>
            <div className="dropdown-content">
              {categories.map((category, index) => (
                <div className="dropdown-link" key={index} onClick={() => handleClick(index)}>{category}</div>
              ))}
            </div>
          </li>
          <li className="nav-item">
            <Link to="/account" className={path === "/account" ? "nav-links path" : "nav-links"}>Account</Link>
          </li>
          <li>
            <Link to="/addproduct" className={path === "/addproduct" ? "sell-links2" : "sell-links"}><b className="sell">SELL</b></Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
