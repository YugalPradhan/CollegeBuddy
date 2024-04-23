import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = ({path,setKeyword}) => {
  const [temp,setTemp]=useState("");
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">CollegeBuddy</h1>
        {path==="shop" && <form className="search-form" onSubmit={(e)=>{e.preventDefault(); setKeyword(temp)}}>
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
        </form>}
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={path==="home"?"nav-links path":"nav-links"}>Home</Link>
          </li>
          <li className="nav-item">
          <Link to="/shop" className={path==="shop"?"nav-links path":"nav-links"}>Shop</Link>
          </li>
          <li className="nav-item">
          <Link to="/categories" className={path==="categories"?"nav-links path":"nav-links"}>Categories</Link>
          </li>
          <li className="nav-item">
          <Link to="/cart" className={path==="cart"?"nav-links path":"nav-links"}>Cart</Link>
          </li>
          <li className="nav-item">
          <Link to="/account" className={path==="account"?"nav-links path":"nav-links"}>Account</Link>
          </li>
          <li>
          <Link to="/addproduct" className={path==="addproduct"?"sell-links2":"sell-links"}><b  className="sell">SELL</b></Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
