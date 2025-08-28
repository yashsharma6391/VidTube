const mongoose = require("mongoose");
const videoSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,

    },
    videoLink:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    videoType:{
        type:String,
        default:'All'
    },
    views:{
        type:Number,
        default:0,
    },
    viewedBy: [{type: mongoose.Schema.Types.ObjectId, ref:"user"}],
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"

    }],
    dislikes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }]

},{timestamps:true})
module.exports = mongoose.model('Video',videoSchema);