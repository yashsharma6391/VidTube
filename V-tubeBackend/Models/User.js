const { request } = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    channelName:{
        type:String,
        require:true,
    },
    userName:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    about:{
        type:String,
        require:true
    },
    profilePic:{
        type:String,
        require:true
    },
    subscribers: [{type: mongoose.Schema.Types.ObjectId, ref:"user"
    }],
      subscribedUsers: [{    // ✅ Add this
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }]

},{timestamps:true})
module.exports = mongoose.model('user', userSchema);