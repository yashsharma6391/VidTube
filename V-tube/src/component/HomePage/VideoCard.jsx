// components/VideoCard.jsx
import { Link, useNavigate } from "react-router-dom";
import "./Homepage.css";
import { useRef, useState } from "react";
import { FormatViews } from "./FormatViews";

const formatDuration = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs}:${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  } else {
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }
};

const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  const [duration, setDuration] = useState(null);
  const videoRef = useRef(null);

    const handleMetadataLoad = () => {
    const sec = videoRef.current?.duration;
    if (sec) {
      setDuration(sec);
    }
  }

 


  return (
    <Link to={`/watch/${video._id}`} className="youtube_Video">
      <div className="youtube_thumbnailBox">
        <img src={video.thumbnail} alt="" className="youtube_thumbnailPic" />
        <video src={video.videoLink} ref={videoRef} onLoadedMetadata={handleMetadataLoad} style={{display:"none"}}/>
        {duration !== null && !isNaN(duration) && ( <div className="youtube_timingthumbnail">{formatDuration(duration)}</div>)}
       
      </div>

      <div className="youtube_TitleBox">
        <div
          className="youtubeTitleBoxProfile"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate(`/user/${video?.user._id}`);
          }}
        >
          <img
            src={video?.user?.profilePic}
            alt=""
            className="youtube_thumbnail_Profile"
             onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://th.bing.com/th/id/OIP.afscx61wTsHlXo6T9vo1SwHaHa?rs=1&pid=ImgDetMain";
            }}
          />
        </div>
        <div className="youtubeTitleBox_Title">
          <div className="youtube_videoTitle">{video?.title}</div>
          <div className="youtube_channelName">{video?.user?.channelName}</div>
         {video?( <div className="youtubeVideo_likes">{FormatViews(video?.views || 0)}</div>):(<p>loading...</p>)}
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
