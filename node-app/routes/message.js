const express=require('express')
const router=express.Router();
const Message=require('../models/Message')
const Product=require('../models/Product')

//route 3 update note
router.post('/addmessage/:productId', fetchUser, async (req, res) => {
    try {
      const productId = req.params.productId;
      const { text } = req.body;
      const userId = req.user.id; // Assuming fetchUser middleware sets req.user with user information
  
      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      // Create a new message object
      const message = new Message({
        sender: userId,
        recipient: product.user,
        product: productId,
        text
      });
  
      // Save the message to the database
      await message.save();
      res.status(201).json({ message });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/messages/:productId', fetchUser, async (req, res) => {
    try {
      const productId = req.params.productId;
      const userId = req.user.id; // Assuming fetchUser middleware sets req.user with user information
  
      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }  
      // Fetch messages related to the product and involving the user
      const messages = await Message.find({
        $or: [
          { sender: userId, recipient: product.user, product: productId },
          { sender: product.user, recipient: userId, product: productId }
        ]
      });
  
      res.json({ messages });
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  module.exports = router;