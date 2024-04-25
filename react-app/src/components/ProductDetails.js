import React, { useState } from 'react';
import '../style/ProductDetails.css'; // Import your CSS file
import Chat from './Chat';

const ProductDetails = ({ curproduct }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === curproduct.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? curproduct.images.length - 1 : prevIndex - 1
    );
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className='parent-container'>
    <div className="product-details">
      <div className="product-image-container">
        <img
          src={curproduct.images[currentImageIndex]}
          alt={curproduct.productName}
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
        <h2>{curproduct.productName}</h2>
        <p><span>Seller:</span> {curproduct.user}</p>
        <p><span>Description: </span> {curproduct.description}</p>
        <p><span>Price: </span> ₹{curproduct.price}</p>
        <div className="date">{formatDate(curproduct.date)}</div>
      </div>
    </div>
    <Chat/>
    </div>
  );
};

export default ProductDetails;
