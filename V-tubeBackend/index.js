// require('dotenv').config();
var express = require("express");
var app = express();
var port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv')

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: envFile });



app.use(cors({
     origin: process.env.FRONTEND_URL,
     credentials: true
     
}));
console.log(process.env.FRONTEND_URL)





app.use(express.json());
app.use(cookieParser());
require('./Connection/conn');


const AuthRoutes = require('./Routes/user');
const videoRoutes = require('./Routes/video');
const CommentRoutes = require('./Routes/comment');
const userRoutes = require('./Routes/user')


app.use('/auth',AuthRoutes);
app.use('/api',videoRoutes);
app.use('/commentApi',CommentRoutes);
app.use('/api/user',userRoutes)




app.listen(port,()=>{console.log(`our project has started ${port} in ${process.env.NODE_ENV} mode`)})