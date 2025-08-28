const { get } = require('mongoose');
// const video = require('../Modals/Video');
const Video = require('../Models/Video');
const user = require('../Models/user');
// const user = require('../Modals/User')


exports.uploadVideo = async (req, res)=>{
    try{
        const {title, description, videoLink, thumbnail, videoType} = req.body;
        
        const videoUpload = new Video({user:req.user._id,title,description,videoLink,thumbnail,videoType}); 
        await videoUpload.save();

        res.status(202).json({message:"video upload successfully",success:"yse",videoUpload});

    }catch(error){
        res.status(500).json({error:"Server error, please try again later"});
        console.log(error);
    }  
}


exports.getAllVideos = async (req, res)=>{
    try{
        const videos = await Video.find().populate('user','channelName profilePic userName createdAt about ');
        // console.log("Sending videos:", videos.map(v => ({ title: v.title, views: v.views })));

        res.status(201).json({success:"true","videos":videos})
    }catch(error){
         res.status(500).json({error:"Server error, please try again later"});
        console.log(error);
    }
}





exports.getVideoById = async (req,res)=>{
        try{
            let {id} = req.params;
            // console.log(id);
           const video = await Video.findById(id).populate('user','channelName profilePic userName createdAt subscribers')

            res.status(201).json({sucess:"true","video":video});

        }catch(error){
         res.status(500).json({error:"Server error, please try again later"});
         console.log(error);
    }
}

exports.getAllVideoByUserID = async (req, res)=>{
    try{
        const {userId} = req.params;                         // Extract userId from request parameters and use// const userId = req.params.userId; // it is also working 
        const video = await Video.find({user:userId}).populate('user','channelName profilePic userName createdAt about subscribers')
        res.status(201).json({success:"true", "video": video});
    }catch(error){
         res.status(500).json({error:"Server error, please try again later"});
         console.log(error);
    }
}

exports.likeVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ message: "Video Not Found" });
        }

        // Remove user from dislikes if present
        video.dislikes = video.dislikes.filter((user) => user.toString() !== userId.toString());

        // Toggle like
        if (video.likes.map(u => u.toString()).includes(userId.toString())) {
            video.likes = video.likes.filter((user) => user.toString() !== userId.toString());
        } else {
            video.likes.push(userId);
        }

        await video.save();
        const updatedVideo = await Video.findById(id).populate('user', 'channelName profilePic userName createdAt about');

        // res.status(200).json({ video: updatedVideo });
        res.status(200).json({ success: true, video: updatedVideo, likes: video.likes.length, dislikes: video.dislikes.length });
    } catch (err) {
        res.status(500).json({ error: "Server error, please try again later" });
        console.log(err);
    }
};


exports.dislikeVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Remove user from likes if present
        video.likes = video.likes.filter((user) => user.toString() !== userId.toString());

        // Toggle dislike
        if (video.dislikes.map(u => u.toString()).includes(userId.toString())) {
            video.dislikes = video.dislikes.filter((user) => user.toString() !== userId.toString());
        } else {
            video.dislikes.push(userId);
        }

        await video.save();
         const updatedVideo = await Video.findById(id).populate('user', 'channelName profilePic userName createdAt about');
        // res.status(200).json({ video: updatedVideo });
        res.status(200).json({ success: true,video: updatedVideo, likes: video.likes.length, dislikes: video.dislikes.length });
    } catch (err) {
        res.status(500).json({ error: "Server error, please try again later" });
        console.log(err);
    }
};

exports.getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    video.views += 1;
    await video.save();
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ message: "Video not found" });
  }
};

exports.increaseViewCount = async (req, res) => {
   try {
    const { userId } = req.body;
    const video = await Video.findById(req.params.id);

    if (!video.viewedBy.includes(userId)) {
      video.views += 1;
      video.viewedBy.push(userId);
      await video.save();
    }

    res.json({ views: video.views });
  } catch (err) {
    res.status(500).json({ message: "Error updating views" });
  }
  // try {
  //   const video = await Video.findByIdAndUpdate(
  //     req.params.id,
  //     { $inc: { views: 1 } },
  //     { new: true }
  //   );
  //   if (!video) return res.status(404).json({ message: 'Video not found' });
  //   res.status(200).json({ message: "View counted", views: video.views });
  // } catch (err) {
  //   res.status(500).json({ message: 'Failed to increase view count' });
  // }
};



exports.getTopVideo = async (req, res) => {
  try {
    const topVideo = await Video.findOne().sort({ views: -1 });

    if (!topVideo) {
      return res.status(404).json({ success: "false", message: "No videos found" });
    }

    res.status(200).json({ success: "true", video: topVideo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params; // video id from URL
    const loggedInUserId = req.user._id; // set by verifyToken middleware

    // 1) Find the video document
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // 2) Authorize: only the uploader can delete
    if (video.user.toString() !== loggedInUserId.toString()) {
      return res.status(403).json({ message: 'You can delete only your own videos' });
    }

    // 3) (Optional) Delete from Cloudinary if you stored it there
    // if (video.cloudinaryId) {
    //   await cloudinary.uploader.destroy(video.cloudinaryId, { resource_type: 'video' });
    // }

    // 4) (Optional) Delete related comments for this video (if you have comments collection)
    // await Comment.deleteMany({ video: id });

    // 5) Delete the video document from MongoDB
    await Video.findByIdAndDelete(id);

    return res.status(200).json({ message: 'Video deleted successfully' });
  } catch (err) {
    console.error('Delete video error:', err);
    return res.status(500).json({ message: 'Server error, please try again later' });
  }
};


