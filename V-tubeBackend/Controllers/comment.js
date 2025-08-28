const { json } = require('express');
const Comments = require('../Models//Comment');




exports.addComment = async (req, res)=>{
    try{
        //  console.log(req.user);
        const {video, message} = req.body;
        const comment = new Comments({user:req.user._id,video,message});
        await comment.save();
        // console.log('coments:',comment)
            await comment.populate('user', 'channelName profilePic userName createdAt');

        res.status(201).json({message:"Success",comment})
    }catch(error){
        res.status(500),json({error: "Server error"});
    }
}

exports.getCommentByVideoId = async (req, res)=>{
    try{
         const {videoId} = req.params;
         const comments = await Comments.find({video: videoId}).populate('user','channelName profilePic userName createdAt')
         res.status(201).json({
            message:"Success",
            comments
         })
    }catch(error){
         res.status(500),json({error: "Server error"});
    }
}

