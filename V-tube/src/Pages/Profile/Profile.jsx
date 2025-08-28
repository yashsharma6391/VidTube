import React, { useEffect, useState } from "react";
import "./Profile.css";
import SideNavbar from "../../component/SideNavbar/SideNavbar";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import VideoCard from "../../component/HomePage/VideoCard";
import VideoThumbnail from "../../component/VideoThumbnail/VideoThumbnail";
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

const BackendUrl = import.meta.env.VITE_BACKEND_URL;
const Profile = ({ sideNavbar }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const fetchProfileData = async () => {
    axios
      .get(`${BackendUrl}/api/${id}/channel`)
      .then((response) => {
        // console.log(response);
        setData(response.data.video);
        setUser(response.data.video[0]?.user);
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(id)
  };
   //  Delete video handler
 const handleDelete = async (e, videoId) => {
  e.stopPropagation(); // prevent Link navigation
  e.preventDefault();
  const confirmDelete = window.confirm("Are you sure you want to delete this video?");
  if (!confirmDelete) return;

  try {
    const res = await axios.delete(`${BackendUrl}/api/${videoId}`, {
      withCredentials: true,
      // headers: { Authorization: `Bearer ${currentUser.token}` },
    });

    if (res.status === 200) {
      //  remove deleted video from UI
      setData((prev) => prev.filter((v) => v._id !== videoId));

      alert(res.data.message || "Video deleted successfully!");
      // console.log(res);
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert(err.response?.data?.message || "Error deleting video");
  }
};
  const currentuserId = localStorage.getItem('userId')
  const toggleMenu = (id) => {
  setOpenMenuId((prev) => (prev === id ? null : id));
};

  useEffect(() => {
    fetchProfileData();
  }, []);
  return (
    <div className="Profile">
      <SideNavbar sideNavbar={sideNavbar} />

      <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>
        <div className="profile_top_section">
          <div
            className={
              sideNavbar
                ? "profile_top_section_profile"
                : "when_sideNavbar_Inactive"
            }
          >
            <img
              className="profile_top_section_img"
              src={user?.profilePic || "https://th.bing.com/th/id/OIP.afscx61wTsHlXo6T9vo1SwHaHa?rs=1&pid=ImgDetMain"}
              alt=""
            />
          </div>
          <div className="profile_top_section_About">
            <div className="profile_top_section_About_Name">
              <div className="userName">{user?.channelName}</div>
              <div>
                <VerifiedIcon sx={{ color: "#4FB6EC" }} />
              </div>
            </div>
            <div className="profile_top_section_info">
              <span>{user?.userName}</span>
              <span>.</span>
              <span>{user?.subscribers.length} subscribers</span>
              <span>{data?.length} Videos</span>
            </div>
          </div>
        </div>

        <div className="profile_videos">
          <div className="profile_videos_title">
            Videos &nbsp; <ArrowRightIcon />
          </div>
          <div className="profileVideos">
            {data?.map((item, key) => {
              return (
                <Link to={`/watch/${item._id}`} className="profileVideos_Block" key={key}>
                  <div className="profileVideo_Block_thumbnail">
                    
                   <VideoThumbnail thumbnail={item.thumbnail} videoLink={item.videoLink} wrapperClass="profileVideo_Block_thumbnail" imageClass="profileVideo_Block_thumbnail_img"/>
                    {/* <img
                      className="profileVideo_Block_thumbnail_img"
                      src={item.thumbnail}
                      alt=""
                    /> */}
                    {item?.user?._id === currentuserId && ( <div onClick={(e)=>{e.stopPropagation();e.preventDefault(); toggleMenu(item._id)}} className="deletebtn">
                      <div><MoreVertOutlinedIcon sx={{color:'red'}}/></div>

                      {openMenuId === item._id && (
                        <div className="deleteMenu">
                          <button onClick={(e)=>{
                            e.stopPropagation();
                            handleDelete(e, item._id);
                          }}>
                            Delete
  
                          </button>
                        </div>
                      )
                        
                      }
                    </div>) }
                   
                  </div>
                    
                  <div className="profileVideo_Block_details">
                    <div className="profileVideo_Block_details_name">
                       <span>{item?.title}</span>
                      
                    </div>
                    <div className="profileVideo_Block_details_about">
                      <span>{item?.user?.channelName}</span>
                      <span>{item?.createdAt.slice(0,10)}</span>
                    </div>
                  </div>
                </Link>
                
              );
              
            })}

          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
