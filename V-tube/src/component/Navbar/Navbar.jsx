import React, { useEffect, useState } from "react";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import YouTubeIcon from "@mui/icons-material/YouTube";
import VidtubeIcon from "../Icons/VidTubeIcon";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import PersonIcon from "@mui/icons-material/Person";
import SideNavbar from "../SideNavbar/SideNavbar";
import { Link, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextLogo from "./TextLogo";
const BackendUrl = import.meta.env.VITE_BACKEND_URL;
// import { logout } from '../../../../Controllers/user';

const Navbar = ({ setSideNavbarfunc, sideNavbar }) => {
  const [userPic, setUserPic] = useState(
    " https://th.bing.com/th/id/OIP.afscx61wTsHlXo6T9vo1SwHaHa?rs=1&pid=ImgDetMain"
  );
  const [navbarModel, setNavbarModel] = useState(false);
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchMode, setMobileSearchMode] = useState(false);
  const [topVideo, setTopVideo] = useState(null);

  useEffect(() => {
    const fetchTopVideo = async () => {
      try {
        const res = await axios.get(`${BackendUrl}/api/topVideo`);
        setTopVideo(res.data);
        // console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTopVideo();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handelClickModel = () => {
    setNavbarModel((prev) => !prev);
  };
  const sideNavbarfunc = () => {
    setSideNavbarfunc(!sideNavbar);
  };
  const handleProfile = () => {
    let userId = localStorage.getItem("userId");
    navigate(`/user/${userId}`);
    setNavbarModel(false);
  };
  const setLoginModel = () => {
    setLogin(false);
  };
  const onclickOfPopUpOption = (button) => {
    setNavbarModel(false);
    if (button === "login") {
      setLogin(true);
    } else {
      localStorage.clear();
      getLogoutFun();
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    }
  };
  const getLogoutFun = async () => {
    axios
      .post(`${BackendUrl}/auth/logout`, {}, { withCredentials: true })
      .then((res) => {
        console.log("Logout");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    let userProfilePic = localStorage.getItem("userProfilePic");
    setIsLogedIn(localStorage.getItem("userId") !== null ? true : false);
    if (userProfilePic !== null) {
      setUserPic(userProfilePic);
    }
  }, []);
  return (
    <div className="navbar">
      {!mobileSearchMode && (
        <div className="navbar-left">
          <div className="navbarHamberger" onClick={sideNavbarfunc}>
            <MenuIcon sx={{ color: "white" }} />
          </div>
          <Link to={"/"} className="navbar_youtubeImg">
           
            <VidtubeIcon
              sx={{ fontSize: "40px", 
              }}
              className="navbar_youtubeImage"
            />
            <div className="navbar_utubeTitle">
              <TextLogo videoUrl={topVideo?.video?.videoLink} videoId={topVideo?.video?._id}/>
              {/* <img src="img.png" alt="" /> */}
              
            
              {/* VIDTube */}
            </div>
            
          </Link>
        </div>
      )}
      <div className="navbar-middle">
        {mobileSearchMode && (
          <div className="searchBoxformobile">
            <input
              type="search"
              className="SearchBox_input"
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <div
              className="cancel-search"
              onClick={() => setMobileSearchMode(false)}
            >
              <ArrowBackIcon />
            </div>
          </div>
        )}

        <div className="navbar_searchBox">
          <input
            type="search"
            className="navbar_searchBoxInput"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />

          <div className="navbar_searchIconBox" onClick={handleSearch}>
            <SearchIcon sx={{ color: "white", fontSize: "28px" }} />
          </div>
        </div>
        {!mobileSearchMode && (
          <div
            className="navbar_searchIconBoxforMobile"
            onClick={() => setMobileSearchMode(true)}
          >
            <SearchIcon
              sx={{
                color: "white",
                fontSize: "25px",
                width: "25px",
                height: "25px",
              }}
            />
          </div>
        )}
        <div className="navbar_mic">
          <KeyboardVoiceIcon sx={{ color: "white" }} />
        </div>
      </div>

      {!mobileSearchMode && (
        <div className="navbar-right">
          <Link to={"/8900/upload"}>
            <VideoCallIcon
              sx={{ color: "white", fontSize: "30px", cursor: "pointer" }}
            />
          </Link>

          <NotificationImportantIcon
            className="notificationIcon"
            sx={{
              color: "white",
              fontSize: "30px",
              cursor: "pointer",
              display: { xs: "none", sm: "block", md: "block" },
            }}
          />
          <img
            onClick={handelClickModel}
            className="navbar-right-logo"
            src={userPic}
            alt="profile"
          />

          {navbarModel && (
            <div className="navbar-model">
              {isLogedIn && (
                <div className="navbar-model-option" onClick={handleProfile}>
                  profile
                </div>
              )}
              {isLogedIn && (
                <div
                  className="navbar-model-option"
                  onClick={() => onclickOfPopUpOption("logout")}
                >
                  Logout
                </div>
              )}
              {!isLogedIn && (
                <div
                  className="navbar-model-option"
                  onClick={() => onclickOfPopUpOption("login")}
                >
                  Login
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {login && <Login setLoginModel={setLoginModel} />}
    </div>
  );
};

export default Navbar;
// https://th.bing.com/th/id/OIP.afscx61wTsHlXo6T9vo1SwHaHa?rs=1&pid=ImgDetMain
