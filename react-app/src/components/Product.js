import React from 'react';
import '../style/Product.css'; // Import your CSS for styling
import { useNavigate } from 'react-router-dom';
const Product = ({ product}) => {
  let navigate=useNavigate();
  const handleClick=()=>{
    navigate(`/productdetails/${product._id}`);
  }
  return (
    <div className="product-card" onClick={handleClick}>  
      <div className="product-image">
        <img src={product.images[0]} alt={product.productName} />
      </div>
      <div className="product-details">
        <h3>{product.productName}</h3>
        <p>Price: ₹{product.price}</p>
        {//<p>Created On: {new Date(product.createdAt).toLocaleDateString()}</p>
}
      </div>
    </div>
  );
};

export default Product;
