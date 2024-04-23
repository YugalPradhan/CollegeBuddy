const express=require("express")
const app=express()
const port=80
const DB_URI="mongodb+srv://pradhanyugal31:hN046UWAuGFPa0OY@cluster0.uaxigto.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const cors=require('cors')
const bodyparser=require('body-parser')

app.use(cors());
app.use(express.json())
const mongoose=require('mongoose')
mongoose.connect(DB_URI).then(()=>{
    console.log("connected to MongoDB");
})
.catch((err)=>{
    console.log('Error connecting to MongoDB: ',err);
})

app.use('/auth',require('./routes/auth'))
app.use('/product',require('./routes/product'))
app.use('/college',require('./routes/college'))
app.use('/message',require('./routes/message'))
app.get('/',(req,res)=>{
    res.json({message:"Hello World"})
})
app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})