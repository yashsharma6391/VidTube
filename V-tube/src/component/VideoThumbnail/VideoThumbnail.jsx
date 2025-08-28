// components/VideoThumbnail.jsx
import { useEffect, useRef, useState } from "react";

const formatDuration = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return hrs > 0
    ? `${hrs}:${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`
    : `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const VideoThumbnail = ({ thumbnail,
  videoLink,
  wrapperClass = "youtube_thumbnailBox",
  imageClass = "youtube_thumbnailPic" }) => {
  const [duration, setDuration] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && videoLink) {
      videoRef.current.load();
    }
  }, [videoLink]);

  const handleMetadataLoad = () => {
    const sec = videoRef.current?.duration;
    if (sec) setDuration(sec);
  };

  return (
    <div className={wrapperClass}>
  <img src={thumbnail} alt="Video Thumbnail" className={imageClass} />


      {videoLink && (
        <video
          ref={videoRef}
          src={videoLink}
          onLoadedMetadata={handleMetadataLoad}
          style={{ display: "none" }}
        />
      )}

      {duration !== null && !isNaN(duration) && (
        <div className="youtube_timingthumbnail">
          {formatDuration(duration)}
        </div>
      )}
    </div>
  );
};

export default VideoThumbnail;
