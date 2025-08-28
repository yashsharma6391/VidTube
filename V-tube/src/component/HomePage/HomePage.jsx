import React from "react";
import "./Homepage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
// import { get } from "mongoose";
import VideoCard from "./VideoCard";
const BackendUrl = import.meta.env.VITE_BACKEND_URL;

const HomePage = ({ sideNavbar }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`${BackendUrl}/api/allVideo`)
      .then((res) => {
        // console.log(res.data.videos);
        setData(res.data.videos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const options = [
    "All",
    "twenty20 cricket",
    "Music",
    "Ajay Devgn",
    "Film criticisms",
    "Thrillers",
    "Dramedy",
    "Mixes",
    "Web Development",
    "Marvel Studios",
    "Softwrae Framework",
    "Hritik Roshan",
    "Movies",
    "Sangam",
    "Grishank",
    "Ashish",
    "Ashwani",
    "Yash",
  ];

  return (
    <div className={sideNavbar ? "homePage" : "fullHomePage"}>
      <div className="homePage_options">
        {options.map((item, index) => {
          return (
            <div key={index} className="homePage_option">
              {item}
            </div>
          );
        })}
      </div>

      <div
        className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutlink"}
      >
        {data?.map((item, index) => {
          

         

          return (
          <VideoCard key={item._id} video={item}/>
          //   <Link to={`/watch/${item._id}`} className="youtube_Video" >
          //     <div className="youtube_thumbnailBox">
          //       <img src={item.thumbnail} alt="" className="youtube_thumbnailPic" />
          //       <div className="youtube_timingthumbnail">28:05</div>
          //     </div>

          //     {/* <div className="youtube_videoTitle">{item?.title}</div> */}

          //     <div className="youtube_TitleBox">
          //       <div className="youtubeTitleBoxProfile" onClick={(e)=>{e.preventDefault();e.stopPropagation(); navigate(`/user/${item?.user._id}`)}}>
          //         <img
          //           src={item?.user?.profilePic}
          //           alt=""
          //           className="youtube_thumbnail_Profile"
          //         />
          //       </div>
          //       <div className="youtubeTitleBox_Title">
          //         <div className="youtube_videoTitle">{item?.title}</div>
          //         <div className="youtube_channelName">{item?.user?.channelName}</div>
          //         <div className="youtubeVideo_likes">{item?.like}</div>

          //       </div>
          //     </div>
          //   </Link>
          );
        })}

      
      </div>
    </div>
  );
};

export default HomePage;
