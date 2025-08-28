const express = require('express');
const router = express.Router();
const videoController = require('../Controllers/video')
const auth = require('../middleware/authentication');

router.post('/video',auth,videoController.uploadVideo);
router.get('/allVideo',videoController.getAllVideos)
router.get('/getVideoById/:id', videoController.getVideoById);
router.get('/:userId/channel', videoController.getAllVideoByUserID)
router.put('/like/:id', auth, videoController.likeVideo);
router.put('/dislike/:id',auth,videoController.dislikeVideo);
// routes/video.js
router.put('/view/:id',videoController.increaseViewCount);
router.get('/topVideo', videoController.getTopVideo)
router.delete('/:id',auth,videoController.deleteVideo)



module.exports = router;