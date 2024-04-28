import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product'; // Import the Product component
import '../style/Product.css'; // Import your CSS for styling

const Account = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch products data from the backend when the component mounts
    const fetchProducts=async()=>{
      try {
        let response;
      if(!localStorage.getItem('token'))
      {response = await axios.get('http://localhost:80/product/allproducts');}
      else 
      {response = await axios.get(`http://localhost:80/product/myproducts`,{
        headers: {
          "auth-token":localStorage.getItem('token')
        }
      });}
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
}
    fetchProducts();
  }, []); // Empty dependency array ensures useEffect runs only once when the component mounts
  return (
    <div className="home-container">
      <h2 className='p'>My Products</h2>
      {products.length?
      <div className="products-list">
        {products.map(product => (
          <Product key={product._id} product={product}/>
        ))}
      </div>:<h2 style={{margin:"10px", color:'white',textAlign:"center"}}>No products to display :) , Please Sell some products</h2>}
    </div>
  );
};

export default Account;
