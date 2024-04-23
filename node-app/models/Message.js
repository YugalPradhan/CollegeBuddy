const mongoose=require('mongoose');
const {Schema}=mongoose
const MessageSchema=new Schema({
  sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
  },
  receiver:{
    type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
  },
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prouct'
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});
const Message=mongoose.model('Message',MessageSchema);
module.exports=Message;