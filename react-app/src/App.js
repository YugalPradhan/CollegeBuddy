import React from 'react'
import Home from "./components/Home";
import Login from "./components/Login"
import Navbar from './components/Navbar';
import AddProduct from './components/Addproduct';
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Signup from './components/Signup';
import Shop from './components/Shop';
import ProductDetails from './components/ProductDetails';
import Account from './components/Account';
function App(){
    return (
        <Router>
      <Navbar/>
      <div style={{paddingTop:"65px"}}>
      <img src="background.jpg" alt="" className='background'/>
      <Routes>
        {/* giving keys to components call is essential because only then react will re-render components */}
        <Route exact path="/" element={<Home/>}>
        </Route>     
        <Route exact path="/login" element={<Login/>}>
        </Route> 
        <Route exact path="/signup" element={<Signup/>}>
        </Route>    
        <Route exact path="/addproduct" element={<AddProduct/>}>
        </Route>     
        <Route exact path="/shop" element={<Shop/>}>
        </Route>     
        <Route exact path="/productdetails/:id" element={<ProductDetails/>}>
        </Route>
        <Route exact path="/account" element={<Account/>}>
        </Route>
      </Routes>
      </div>
      </Router>
    );
}

export default App;
