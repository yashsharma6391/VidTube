import React from "react";
import "./SideNavbar.css";
import "./Marvel.png";
import { topMenu, youMenu, subscriptions } from "./sidebarItems";
import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";

import HomeIcon from "@mui/icons-material/Home";
import VideocamIcon from "@mui/icons-material/Videocam";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import HistoryIcon from "@mui/icons-material/History";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { Link } from "react-router-dom";
const SideNavbar = ({ sideNavbar }) => {
  return (
    <div>
      <div className={sideNavbar ? "home-sideNavbar" : "homeSideNavbarHide"}>
        <div className="home-sideNavbarTop">
          {topMenu.map((item, i) => (
            <SidebarItem key={i} {...item} />
          ))}

          {/* <Link to={'/'} className={`home_sideNavbarTopOption`}>
                    <HomeIcon sx={{color:"white"}}/>
                    <div className="home_sideNavbarTopOptionTitle">Home</div>
                </Link>
                <div className={`home_sideNavbarTopOption`}>
                    <VideocamIcon sx={{color:"white"}}/>
                    <div className="home_sideNavbarTopOptionTitle">Shorts</div>
                </div>
                <div className={`home_sideNavbarTopOption`}>
                    <SubscriptionsIcon sx={{color:"white"}}/>
                    <div className="home_sideNavbarTopOptionTitle">Subscription</div>
                </div> */}
        </div>
        {/* <div className="home_sideNavbarMiddle"> */}

        <SidebarSection>
          {youMenu.map((item, i) => (
            <SidebarItem key={i} {...item} />
          ))}
        </SidebarSection>
        {/* <div className={`home_sideNavbarTopOption`}>
                    <div className="home_sideNavbarTopOptionTitle">You</div>
                    <ArrowRightIcon sx={{color:"white"}}/>
                </div>
                <div className={`home_sideNavbarTopOption`}>
                    <RecentActorsIcon sx={{color:"white"}}/>
                    <div className="home_sideNavbarTopOptionTitle">Your Channel</div>
                </div>
                 <div className={`home_sideNavbarTopOption`}>
                    <HistoryIcon sx={{color:"white"}}/>
                    <div className="home_sideNavbarTopOptionTitle">History</div>
                </div>
                 <div className={`home_sideNavbarTopOption`}>
                    <PlaylistAddIcon sx={{color:"white"}}/>
                    <div className="home_sideNavbarTopOptionTitle">Playlists</div>
                </div>
                 <div className={`home_sideNavbarTopOption`}>
                    <SmartDisplayIcon sx={{color:"white"}}/>
                    <div className="home_sideNavbarTopOptionTitle">Your videos</div>
                </div>
                 <div className={`home_sideNavbarTopOption`}>
                    <WatchLaterIcon sx={{color:"white"}}/>
                    <div className="home_sideNavbarTopOptionTitle">Watch Later</div>
                </div>
                <div className={`home_sideNavbarTopOption`}>
                    <ThumbUpOffAltIcon sx={{color:"white"}}/>
                    <div className="home_sideNavbarTopOptionTitle">Liked videos</div>
                </div>
                <div className={`home_sideNavbarTopOption`}>
                    <ContentCutIcon sx={{color:"white"}}/>
                    <div className="home_sideNavbarTopOptionTitle">Your clips</div>
                </div> */}

        {/* </div> */}

        <SidebarSection title="Subscription">
          {subscriptions.map((item, i) => (
            <SidebarItem key={i} {...item} />
          ))}
        </SidebarSection>

        {/* <div className="home_sideNavbarMiddle">
                <div className="home_sideNavbarTopOption">
                    <div className="home_sideNavbarTopOptionTitleHeader">Subscription</div>
                </div>
                <div className="home_sideNavbarTopOption">
                    <img className='home_sideNavbar_ImgLogo' src="https://e7.pngegg.com/pngimages/419/220/png-clipart-logo-marvel-comics-marvel-entertainment-marvel-studios-others-comics-avengers.png" alt="" />
                    <div className="home_dideNavbarTopOptionTitle">Marvel</div>
                </div>
                
            </div> */}
      </div>
    </div>
  );
};

export default SideNavbar;
