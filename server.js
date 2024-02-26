const express = require ('express');
const dotenv = require('dotenv') ;
const mongoose =require ('mongoose');
const UserRouter = require('./Routes/userRoutes');
const cookieParser = require('cookie-parser');
const MovieRouter = require('./Routes/movieRoutes');
const cors=require('cors');
mongoose.set("strictQuery",false)

const app=express();
app.use(cors({credentials: true , origin:"http://localhost:3000"}));
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.setHeader("Access-Control-Allow-Credentials","true")
                  res.send("api is runnig")
                  })
mongoose.connect(process.env.DB_URL).then(console.log("db connected"))
const port=process.env.port || 4000;
app.use("/api/movies/",MovieRouter)
app.use("/api/users/",UserRouter)





app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})
