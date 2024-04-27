import React, { useState, useEffect } from 'react';
import '../style/ProductDetails.css'; // Import your CSS file
import Chat from './Chat';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Initialize product state with null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:80/product/getproduct/${id}`);
        setProduct(response.data); // Update product state with fetched data
      } catch (error) {
        console.error('Error getting product:', error);
      }
    };
    
    fetchData(); // Call fetchData function when component mounts
  }, [id]); // Dependency array to re-run effect when id changes

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  // Render loading message while product is being fetched
  return (
    <>
    {product &&
     <div className='parent-container'>
      <div className="product-details">
        <div className="product-image-container">
          <img
            src={product.images[currentImageIndex]}
            alt={product.productName}
            className="product-image"
          />
          <button className="prev-button" onClick={handlePrevImage}>
            &lt;
          </button>
          <button className="next-button" onClick={handleNextImage}>
            &gt;
          </button>
        </div>
        <div className="product-info">
          <h2>{product.productName}</h2>
          <p><span>Seller:</span> {product.user}</p>
          <p><span>Description: </span> {product.description}</p>
          <p><span>Price: </span> ₹{product.price}</p>
          <div className="date">{formatDate(product.date)}</div>
        </div>
      </div>
      <Chat product={product}/>
    </div>}
    </>
  );
};

export default ProductDetails;
