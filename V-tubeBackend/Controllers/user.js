// const User = require('../Modals/User');
// const user = require('../Modals/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
// const user = require('../Modals/user');

const cookieOptions = {
    httpOnly: true,
    secure: true,   // set to true in production
    sameSite:'Lax'
}

exports.signUp = async(req,res)=>{
    try{
        const {channelName,userName,about,profilePic,password} = req.body;
        const isExist = await User.findOne({userName});
        
        if(isExist){
            return res.status(400).json({message:"user already exists please try with other user name"});
        }else{
            let updaatedPass = await bcrypt.hash(password,10);
            const user = new User({channelName,userName,about,profilePic,password:updaatedPass});
            await user.save();
            return res.status(201).json({message:'User registered successfully',success:"yes"}) //data.user
        }
    }catch(error){
            res.status(500).json({error:"Server error, please try again later"});
    }
    
}
exports.signIn = async(req,res)=>{
    try{
        const {userName,password} = req.body;
        const user = await User.findOne({userName});
        const isMatch = await bcrypt.compare(password, user.password)
        if(user && isMatch){
         
                const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET , {expiresIn: '7d'});
                // console.log(token);
                res.cookie('token',token,cookieOptions);
                
                return res.status(200).json({message:"User logged in successfully",success:"yes",token,user}); //data.user
            
        }else{
            return res.status(400).json({message:"user does not exist, please sign up first",success:"no"})
        }
    }catch(error){
            res.status(500).json({error:"Server error, please try again later"});
            console.log(error);
    }
}

exports.logout = async(req,res)=>{
    res.clearCookie('token',cookieOptions).json({message:"logged out successfully"})
}



// subscribe to a channel
exports.subscribeUser = async (req, res) => {
  const userId = req.user._id;
  const channelId = req.params.id;

  if (userId === channelId) {
    return res.status(400).json({ message: "Cannot subscribe to yourself" });
  }

  try {
    const channel = await User.findById(channelId);
    const user = await User.findById(userId);

    if (!channel.subscribers.includes(userId)) {
      channel.subscribers.push(userId);


      await channel.save();
    }

    if (!user.subscribedUsers.includes(channelId)) {
      user.subscribedUsers.push(channelId);
      await user.save();
    }
    // console.log("user.subscribedUsers:", user.subscribedUsers);
    // console.log("channel.subscribers:", channel.subscribers);

    res.status(200).json({ subscribers: channel.subscribers.length });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


exports.unsubscribeUser = async (req, res) => {
  const userId = req.user.id; // Make sure you're using `id` not `_id`
  const channelId = req.params.id;

  try {
    const channel = await User.findByIdAndUpdate(
      channelId,
      { $pull: { subscribers: userId } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      userId,
      { $pull: { subscribedUsers: channelId } },
      { new: true }
    );

    res.status(200).json({ subscribers: channel.subscribers.length });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

