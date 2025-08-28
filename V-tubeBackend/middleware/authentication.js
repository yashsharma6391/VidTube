const jwt = require('jsonwebtoken');
const User = require('../Models/user');
const { json } = require('express');


const auth = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({error:'Access denied. No token provided'});
    }else{
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decode.userId).select("-password");
            next();

        }catch(error){
            res.status(401).json({error:"Token is not valid"});
            console.log(error)
        }
    }
}
module.exports = auth;