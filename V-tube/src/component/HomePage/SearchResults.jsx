// SearchResults.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import VideoCard from '../HomePage/VideoCard'; // adjust path if needed
import './Homepage.css'; // optional: for layout styling
import SideNavbar from '../SideNavbar/SideNavbar';
 const BackendUrl = import.meta.env.VITE_BACKEND_URL;

const SearchResults = ({ sideNavbar }) => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const navigate = useNavigate();

  useEffect(() => {
  axios.get(`${BackendUrl}/api/allVideo`)
    .then(res => {
      const queryWords = query.trim().toLowerCase().split(" ");

      const filtered = res.data.videos.filter(video =>
        queryWords.every(word =>
          video.title.toLowerCase().includes(word) ||
          video.user.channelName.toLowerCase().includes(word)
        )
      );

      setResults(filtered);
    })
    .catch(err => {
      console.error("Search fetch error:", err);
    });
}, [query]);


  return (
    <div className={sideNavbar ? "homePage" : "fullHomePage"}>
      <SideNavbar sideNavbar={sideNavbar}/>
      
    <div className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutlink"} style={{paddingTop:"60px"}} >
      {results.length > 0 ? (
        results.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))
      ) : (
        <p style={{ color: "white", padding: "20px" }}>No matching videos found.</p>
      )}
    </div>
    </div>
   
  );
};

export default SearchResults;
