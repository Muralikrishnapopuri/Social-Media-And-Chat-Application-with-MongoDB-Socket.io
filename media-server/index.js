// packages-------------
import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
//Routes
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import UploadRoute from './Routes/UploadRoute.js'
import ChatRoute from './Routes/ChatRoute.js'
import MessageRoute from './Routes/MessageRoute.js'
// craete App with express and start operations----
const app=express();
// to server images for public
app.use(express.static('public'))
app.use('/images',express.static("images"))
// middleware------
app.use(bodyParser.json({limit:'30mb', extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb', extended:true}));
app.use(cors({ origin: true }));
// app.use(cors());
dotenv.config();
//--mongodb connection----------
//,{useNewUrlParser:true,useUnifiedTopology:true}
mongoose.connect(process.env.MONGO_DB
)
.then(()=>app.listen(process.env.PORT, ()=> console.log(`Server Started at: http://localhost:${process.env.PORT}`)))
.catch((err)=> console.log(err)); 
// usage of route

app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/posts',PostRoute)
app.use('/upload', UploadRoute)
app.use("/chat", ChatRoute)
app.use('/message',MessageRoute)



