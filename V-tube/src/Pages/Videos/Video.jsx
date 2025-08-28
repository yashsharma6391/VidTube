import React, { useEffect, useRef, useState } from "react";
import "./video.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import VerifiedIcon from "@mui/icons-material/Verified";
import SideNavbar from "../../component/SideNavbar/SideNavbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DescriptionBox from "./DescriptionBox";
import CommentBox from "./CommentBox";
import VideoThumbnail from "../../component/VideoThumbnail/VideoThumbnail";
const BackendUrl = import.meta.env.VITE_BACKEND_URL;


const Video = ({ sideNavbar, setSideNavbarfunc }) => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const [videoUrl, setVideoURL] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(data?.user?.subscribers?.length || 0);
  const hasCountedView = useRef(false);
  const { id } = useParams();
  // console.log(id);

// ------------------------------------------------------------------------------------------------------------------

// it fetch video user want to see
  const fetchVideoById = async () => {
  try {
    const response = await axios.get(`${BackendUrl}/api/getVideoById/${id}`);
    // console.log(response.data.video);
    setData(response.data.video);
    setVideoURL(response.data.video.videoLink);

   
  } catch (error) {
    console.log("Error fetching video :", error);
  }
};

// -------------------------------------------------------------------------------------------------------------------
// fetch comment of the video
  const getCommentByVideoId = async () => {
    await axios
      .get(`${BackendUrl}/commentApi/comment/${id}`)
      .then((response) => {
        // console.log(response);
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.log(error);
      });
  };

// ------------------------------------------------------------------------------------------------------------------

// Handle posting comments
  const handleComment = async () => {
    const body = {
      message: message,
      video: id,
    };
    await axios
      .post(`${BackendUrl}/commentApi/comment`, body, {
        withCredentials: true,
      })
      .then((resp) => {
        // console.log(resp);
        const newComment = resp.data.comment;
        setComments((prev)=>[newComment, ...comments]);
        setData({...data, comments:[newComment, ...comments]})
        setMessage(" ");
      })
      .catch((err) => {
        toast.error("Please login first");
      });
  };
// -----------------------------------------------------------------------------------------------------------------

// Handle like dislike function
  
  const handleLike = async () => {
    try {
      const resp = await axios.put(
        `${BackendUrl}/api/like/${id}`,
        {},
        { withCredentials: true }
      );
      if (resp.data.video) {
        setData(resp.data.video); // update video data (like/dislike counts)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDislike = async () => {
    try {
      const resp = await axios.put(
        `${BackendUrl}/api/dislike/${id}`,
        {},
        { withCredentials: true }
      );
      if (resp.data.video) {
        setData(resp.data.video);
      }
    } catch (err) {
      console.log(err);
    }
  };

//------------------------------------------------------------------------------------------------------------------

// It fetch rendom videos for sugesstion field
  const fetchSuggestions = async () => {
    try {
      const resp = await axios.get(`${BackendUrl}/api/allVideo`); // get all videos
      // Filter out the current video
      const otherVideos = resp.data.videos.filter((v) => v._id !== id);
      // Shuffle and pick 8 random videos
      const shuffled = otherVideos.sort(() => 0.5 - Math.random());
      setSuggestions(shuffled.slice(0, 100));
    } catch (err) {
      console.log(err);
    }
  };

//--------------------------------------------------------------------------------------------- --------------------

  //It checks that the logedin user is already subscribed  

  const currentUserId = localStorage.getItem("userId");

useEffect(() => {
  if (
    data?.user?._id &&
    Array.isArray(data.user.subscribers) &&
    currentUserId
  ) {
    const isUserSubscribed = data.user.subscribers.some(
      (sub) => sub?.toString?.() === currentUserId
    );
    setIsSubscribed(isUserSubscribed);
    setSubscriberCount(data.user.subscribers.length);
  }
}, [data?.user?._id, data?.user?.subscribers?.length, currentUserId]);


// useEffect(() => {
//   console.log("Current video channel ID:", data?.user?._id);
//   console.log("Logged in user ID:", currentUserId);
//   console.log("All subscribers:", data?.user?.subscribers);
//   console.log("Is Subscribed:", isSubscribed);
// }, [isSubscribed, data]);




// ------------------------------------------------------------------------------------------

// it handel subscriptions
  const handleSubscribe = async () => {
    if (!currentUserId) {
      toast.error("Please login to subscribe");
      return;
    }
    try {
      const resp = await axios.put(
        `${BackendUrl}/api/user/subscribe/${data?.user?._id}`,
        {},
        { withCredentials: true }
      );
          setData(prev => {
      if (!prev?.user?.subscribers) return prev; // to handle missing subscribers array

      // Check if already in the list (avoid duplicates)
      const alreadySubscribed = prev.user.subscribers.some(
        id => id?.toString?.() === currentUserId
      );

      if (alreadySubscribed) return prev;

      return {
        ...prev,
        user: {
          ...prev.user,
          subscribers: [...prev.user.subscribers, currentUserId],
        },
      };
    });
      setIsSubscribed(true);
      setSubscriberCount(resp.data.subscribers);
    } catch (err) {
      toast.error("Error subscribing");
      console.log(err);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const resp = await axios.put(
        `${BackendUrl}/api/user/unsubscribe/${data?.user?._id}`,
        {},
        { withCredentials: true }
      );
       setData(prev => {
      if (!prev?.user?.subscribers) return prev;

      return {
        ...prev,
        user: {
          ...prev.user,
          subscribers: prev.user.subscribers.filter(
            id => id?.toString?.() !== currentUserId
          ),
        },
      };
    });
      setIsSubscribed(false);
      setSubscriberCount(resp.data.subscribers);
    } catch (err) {
      toast.error("Error unsubscribing");
      console.log(err);
    }
  };

// -----------------------------------------------------------------------------------

  // it increase count of view when user watch first time the video
  const handleViewCount = (e) => {
  if (!hasCountedView.current && e.target.currentTime > 5) {
    // console.log("View counted");
    axios.put(`${BackendUrl}/api/view/${id}`,{userId: currentUserId});
    hasCountedView.current = true;
  }
};

  //  it return the boolean value of if user like or dislike
  const isLiked = data?.likes?.some((id) => id === currentUserId);
  const isDisliked = data?.dislikes?.some((id) => id === currentUserId);

  // call every function when video Id changes
  useEffect(() => {
    setIsSubscribed(false);
    setSubscriberCount(0);
    setData(null); // clear previous video data
    setVideoURL(""); // Clear previous video URL
    fetchVideoById();
    getCommentByVideoId();
    fetchSuggestions();
  }, [id]);
 
  useEffect(() => {
    setSideNavbarfunc(false);
  }, []);

  return (
    <div className="video" key={id}>
      {sideNavbar && <SideNavbar sideNavbar={sideNavbar} />}
      <div className="videoPostSection">
        <div className="video_youtube">
          {data && (
            <video
              width="400"
              controls
              autoPlay
              className="video_youtube_video"
              onTimeUpdate={handleViewCount}
            >
              {/* <source src="videofile.mp4" type="video/webm" />  */}
              {/* <iframe width="400" src="https://youtube.com/shorts/embed/d3jmCGkwKnQ?feature=shared" type="video/webm" allow='autoplay' /> */}
              <source
                src={videoUrl}
                type="video/mp4"
                allow="autoplay; accelerometer clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
              <source
                src={videoUrl}
                type="video/webm"
                allow="autoplay; accelerometer clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
              Your browser does not support the video tag
            </video>
          )}
          {/* <iframe width='400' height="225" src="https://youtube.com/embed//d3jmCGkwKnQ?feature=shared" frameborder="0" allow='autoplay; accelerometer clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen></iframe> */}
        </div>
        <div className="video_youtubeAbout">
          <div className="video_uTubeTitle">{data?.title} </div>
          <div className="youtube_video_profileblock">
            <div className="youtube_video_profileblock_left">
              <Link
                to={`/user/${data?.user?._id}`}
                className="youtube_video_profileblock_left_img"
              >
                <img
                  src={data?.user?.profilePic}
                  alt=""
                  className="youtube_video_profileblock_left_image"
                />
              </Link>
              <Link
                to={`/user/${data?.user?._id}`}
                className="youtubeVideo_subsView"
              >
                <div className="youtubePostProfilename">
                  {data?.user?.channelName}
                </div>
                <div className="youtubePostProfileSubs">
                  {data?.user?.createdAt.slice(0, 10)}
                </div>
              </Link>
              <div className="subscribebuttonnyoutube">
                {isSubscribed ? (
                  <div className="subscribeText" onClick={handleUnsubscribe}>
                    Subscribed
                  </div>
                ) : (
                  <div onClick={handleSubscribe}>Subscribe</div>
                )}
              </div>
              <span className="subscriberCount">{subscriberCount}</span>
            </div>
            <div className="youtube_video_likeBlock">
              <div
                className="youtube_video_likeBlock_like"
                onClick={handleLike}
              >
                <ThumbUpOffAltIcon
                  sx={{ width: "20px" }}
                  style={{ color: isLiked ? "#1976d2" : "grey" }}
                />
                <div className="youtube_video_likeBlock_Nooflikes">
                  {data?.likes?.length || 0}
                </div>
              </div>
              <div className="youtubevideodivider"></div>
              <div
                className="youtube_video_likeBlock_like"
                onClick={handleDislike}
              >
                <div className="youtube_video_likeBlock_Nooflikes">
                  {data?.dislikes?.length || 0}
                </div>

                <ThumbDownOffAltIcon
                  sx={{ width: "20px" }}
                  style={{ color: isDisliked ? "#1976d2" : "grey" }}
                />
              </div>
            </div>
          </div>
          {/* Discription box code */}
          <div className="youtube_video_About">
            <div>{data?.createdAt.slice(0, 10)}</div>
            <div>
              <DescriptionBox text={data?.description || ""} />
            </div>
          </div>
           {/* Discription box code end*/}


          <div className="youtubeCommentSection">
            <div className="youtubeCommentSectionTitle">
              {comments.length} Comments
            </div>
            <div
              className="toggleButton"
              onClick={() => setShowComments((prev) => !prev)}
              style={{ cursor: "pointer", color: "#2563eb", fontWeight: "500", fontSize:"15px" }}
            >
              {showComments ? "Show Less" : "Show More"}
            </div>
          </div>

          {showComments && (
            <>
            <div className="youtubeSelfComment">
              <img
                className="video_youtubeSelfCommentprofile"
                alt=""
                src={
                  localStorage.getItem("userProfilePic") ||
                  "https://th.bing.com/th/id/OIP.afscx61wTsHlXo6T9vo1SwHaHa?rs=1&pid=ImgDetMain"
                }
              />
              <div className="addAComment">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  className="addACommentInput"
                  placeholder="Add a comment"
                />
                <div className="cancelSubmitComment">
                  <div className="cancelComment">Cancel</div>
                  <div className="cancelComment" onClick={handleComment}>
                    Comment
                  </div>
                </div>
              </div>
            </div>
            <div className="youtubeOthersComments">
              {comments.map((item, index) => {
                return (
                  <div className="youtubeSelfComment" key={index}>
                    <img
                      className="video_youtubeSelfCommentprofile"
                      src={item?.user.profilePic}
                      alt=""
                    />
                    <div className="others_commentSection">
                      <div className="others_commentSectionHeader">
                        <div className="channelName_comment">
                          {item?.user?.channelName}
                        </div>
                        <div className="commentTimingOthers">
                          {item?.createdAt.slice(0, 10)}
                        </div>
                      </div>
                      <div className="otherComentSectionComment">
                        <CommentBox text={item?.message}/>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
              
            </>
          )}


          {/* <div className="youtubeSelfComment">
              <img
                className="video_youtubeSelfCommentprofile"
                alt=""
                src={
                  localStorage.getItem("userProfilePic") ||
                  "https://th.bing.com/th/id/OIP.afscx61wTsHlXo6T9vo1SwHaHa?rs=1&pid=ImgDetMain"
                }
              />
              <div className="addAComment">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  className="addACommentInput"
                  placeholder="Add a comment"
                />
                <div className="cancelSubmitComment">
                  <div className="cancelComment">Cancel</div>
                  <div className="cancelComment" onClick={handleComment}>
                    Comment
                  </div>
                </div>
              </div>
            </div>
            <div className="youtubeOthersComments">
              {comments.map((item, index) => {
                return (
                  <div className="youtubeSelfComment">
                    <img
                      className="video_youtubeSelfCommentprofile"
                      src={item?.user.profilePic}
                      alt=""
                    />
                    <div className="others_commentSection">
                      <div className="others_commentSectionHeader">
                        <div className="channelName_comment">
                          {item?.user?.channelName}
                        </div>
                        <div className="commentTimingOthers">
                          {item?.createdAt.slice(0, 10)}
                        </div>
                      </div>
                      <div className="otherComentSectionComment">
                        {item?.message}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div> */}
          </div>
      </div>
        
      

        {/* --------------video suggestion part------------ */}
        <div className="videoSuggestions">
          {suggestions.map((item, index) => (
            <Link
              to={`/watch/${item._id}`}
              className="videoSuggestionBlock"
              key={item._id}
            >
              <div className="video_suggestion_thumbnail">
                <VideoThumbnail thumbnail={item.thumbnail} videoLink={item.videoLink} wrapperClass="video_suggestion_thumbnail" imageClass="video_suggestion_thumbnail_img" />

                {/* <img
                  className="video_suggestion_thumbnail_img"
                  src={item.thumbnail || ""}
                  alt=""
                /> */}
              </div>
              <div className="video_suggestion_About">
                <div className="video_suggestion_About_title">{item.title}</div>
                <div className="video_suggestion_channel_name">
                  <span className="video_suggestion_channel_name_title">
                    {item.user?.channelName}
                  </span>
                  <span>
                    <VerifiedIcon sx={{ color: "grey", width: "15px" }} />
                  </span>
                </div>
                <div className="video_suggestion_About_Profile">
                  {item.user?.createdAt.slice(0, 10)}
                </div>
              </div>
            </Link>
          ))}
          {/* </div> */}
          {/* </div> */}
        </div>
        <div>
        <ToastContainer />
        </div>
    </div> 
    
  );
};

export default Video;
// https://youtu.be/O_s2ftvaxD4?feature=shared
// Avengers:Endgame | Official Trailer | Hindi | In Cinemas April 26
// indiaMarvel 1.3 crore views 6 years ago
 // const currentUser = JSON.parse(localStorage.getItem("user"));
