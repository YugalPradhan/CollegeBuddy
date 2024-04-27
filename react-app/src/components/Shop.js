import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product'; // Import the Product component
import '../style/Product.css'; // Import your CSS for styling

const Shop = ({navchange,searchTerm} ) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch products data from the backend when the component mounts
    const fetchProducts=async()=>{
      try {
        let response;
      if(!localStorage.getItem('token'))
      {response = await axios.get('http://localhost:80/product/allproducts');}
      else if(searchTerm!=="")
      {response = await axios.get(`http://localhost:80/product/search?keyword=${searchTerm}`,{
        headers: {
          "auth-token":localStorage.getItem('token')
        }
      });}
      else {response = await axios.get('http://localhost:80/product/collegeproducts',{
        headers: {
          "auth-token":localStorage.getItem('token')
        }
      });}
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
    navchange("shop")}
    fetchProducts();
  }, [searchTerm]); // Empty dependency array ensures useEffect runs only once when the component mounts
  return (
    <div className="home-container">
      <h2 className='p'>Products</h2>
      <div className="products-list">
        {products.map(product => (
          <Product key={product._id} product={product}/>
        ))}
      </div>
    </div>
  );
};

export default Shop;
