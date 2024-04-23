const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');

const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const fetchuser = require('./fetchuser');
const College = require('../models/College');
const User = require('../models/User');
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dwmegcqzs',
    api_key: '219217441637877',
    api_secret: '_6VSDOpT794goiyTfd0f4-h9Dxw'
  });
  
  // Configure Multer storage to upload images to Cloudinary
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'images', // Optional - specify folder name in Cloudinary
      allowed_formats: ['jpg', 'jpeg', 'png'], // Optional - specify allowed formats
      resource_type: 'auto' // Optional - specify resource type (auto, raw, image, video)
    }
  });
const upload = multer({ storage: storage });

// Route to handle adding a new product
router.post('/addproduct',fetchuser, upload.array('images', 6), async (req, res) => {
  try {
    const { productName, description, price, category, subCategory} = req.body;
    const user=req.user.id;
    const images = req.files.map(file => file.path);
    const newProduct = new Product({
      productName,
      description,
      price,
      category,
      subCategory,
      images,
      user
    });

    // Saving the new product to the database
    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Failed to add product' });
  }
});

router.get('/allproducts', async (req, res) => {
  try {
    // Fetch all products from the database
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});
//for same college
router.get('/collegeproducts',fetchuser, async (req, res) => {
  try {
    const users=await User.find({college:req.user.college,_id:{$ne:req.user.id}});
    const userids=users.map(user=>user._id);
    const products=await Product.find({user:{$in:userids}});
   return res.json(products)
} catch (error) {
    return res.status(500).json({message:error.message});
}
});
//to get products of user
router.get('/myproducts',fetchuser, async (req, res) => {
  try {
    const product=await Product.find({user:req.user.id});
    console.log(req.user.id);
   return res.json(product)
} catch (error) {
    return res.status(500).json({message:error.message});
}
});

router.get('/search', fetchuser, async (req, res) => {
  try {
      const keyword = req.query.keyword;
      
      // Find users in the same college (excluding the current user)
      console.log("college =",req.user.college,"id=",req.user.id)
      const users = await User.find({ college: req.user.college, _id: { $ne: req.user.id } });
      const userids = users.map(user => user._id);
      console.log(users)
      // Search for products where productName or category contains the keyword and user is in the same college
      const products = await Product.find({
          $and: [
              { user: { $in: userids } }, // User is in the same college
              {
                  $or: [
                      { productName: { $regex: keyword, $options: 'i' } }, // Match productName containing keyword
                      { category: { $regex: keyword, $options: 'i' } } // Match category containing keyword
                  ]
              }
          ]
      });

      res.json(products);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
  }
});


module.exports=router;
