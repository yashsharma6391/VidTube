const mongoose = require("mongoose");

// V-tubeBackend

mongoose
 .connect(process.env.MONGO_URI,{
   // useNewUrlParser: true,
   //  useUnifiedTopology: true,

 })
 .then(()=>console.log(`DB connection successfull : ${process.env.MONGO_URI}`)).catch(err=>{
    console.log(err)
 });

