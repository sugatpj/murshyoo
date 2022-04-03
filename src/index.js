const express = require("express");
const env = require("dotenv");
const res = require("express/lib/response");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRouter=require('./Routes/authRoute')
const adminRouter=require('./Routes/admin/authRoute')
const categoryRoutes=require('./Routes/category')
const productRoute=require('./Routes/product')
const cartRoute=require('./Routes/cart')
const orderRoute=require('./Routes/order')
const cookieParser=require('cookie-parser')
const wishRoute=require('./Routes/wish')
const cors=require("cors")
const path=require('path')
//env configuration
env.config();

//https://mongoosejs.com/
// mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.gmzxn.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,

// }).then(()=>{
//   console.log('Database connected')
// });
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.y4ulp.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(()=>{
  console.log('Database connected')
});




const port = 8000;

//middleware from body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
// app.use(express.urlencoded({extended:true}))
//expose image in server
app.use('/public',express.static(path.join(__dirname,'uploads')))
//for cross policy
app.use(cors({
  origin:"*"
}))
//cookie parser
app.use(cookieParser())
//authentication routing
app.use('/api',authRouter)
app.use('/api',adminRouter)

//category routing
app.use('/api',categoryRoutes)

//product routing
app.use('/api',productRoute)
//add-to-cart routing
app.use('/api',cartRoute)
//order routing
app.use('/api',orderRoute)
//wish routing
app.use('/api',wishRoute)
app.get('/',(req,res)=>{
  res.status(200).json({
    message:"welcome to my app"
  })
})



//server listen
app.listen(port, () => {
  console.log(`server is running on PORT:${port}`);
});
