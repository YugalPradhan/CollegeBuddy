import React, { useState,useEffect } from 'react';
import '../style/Signup.css';
import axios from 'axios';

const AddProduct = ({navchange}) => {
  useEffect(() => {
    navchange("addproduct")
})
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    const imagesArray = [];
    for (let i = 0; i < files.length && i < 6; i++) {
      imagesArray.push(URL.createObjectURL(files[i]));
    }
    setImages(Array.from(files)); // Store files instead of URLs
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    images.forEach(image => formData.append('images', image));

    try {
      const response = await axios.post('http://localhost:80/product/addproduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "auth-token":localStorage.getItem('token')
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Form inputs */}
        <div className="input-group">
          <label htmlFor="productName">Product Name: <span className="required">*</span></label>
          <input type="text" id="productName" name="productName" className="input-field" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description: <span className="required">*</span></label>
          <textarea id="description" name="description" className="input-field" value={description} placeholder="Include brand name, condition, features and reason for selling" onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="input-group">
        <label htmlFor="price">Set a price: <span className="required">*</span></label>
        <div className="price-input">
            <span className="currency-symbol">₹</span>
            <input type="number" id="price" name="price" className="input-field" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        </div>

        <div className="input-group">
          <label htmlFor="category">Category: <span className="required">*</span></label>
          <select id="category" name="category" className="input-field" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            <option value="bicycles">Bicycle</option>
            <option value="coolers">Cooler</option>
            <option value="inductions">Induction</option>
            <option value="kettles">Kettle</option>
            <option value="books">Books</option>
            <option value="papers">Exam Papers/Assignments</option>
            <option value="heaters">Heater</option>
            <option value="mattresses pillows">Mattress/Pillows</option>
            <option value="phones tabs computers electronics">Phone/Tab/Electronics</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="images">Images: <span className="required">*</span></label>
          <input type="file" id="images" name="images" className="input-field" onChange={handleImageChange} accept="image/*" multiple required />
        </div>
        <div className="preview-images">
          {images.map((image, index) => (
            <div className="image-box" key={index}>
              <img src={URL.createObjectURL(image)} alt="" />
            </div>
          ))}
        </div>
        <button type="submit" className="btn">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
