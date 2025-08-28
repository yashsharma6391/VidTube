import React, { useEffect, useRef, useState } from 'react'
import './TextLogo.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const TextLogo = ({videoUrl,videoId,children,props}) => {
  const navigate = useNavigate();
  const clickTimer = useRef(null);
  const secureUrl = videoUrl?.replace("http://", "https://");

    const handleClick = () => {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
    }

    // single click (wait 300ms to check for double click)
    clickTimer.current = setTimeout(() => {
      navigate("/"); // go to home
      clickTimer.current = null;
    }, 300);
  };

  const handleDoubleClick = () => {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
    }

    if (videoId) {
      navigate(`/watch/${videoId}`); // go to video watch page
    }
  };

  return (
    <div className='banner'>
        <video key={secureUrl} autoPlay muted loop playsInline {...props}>
            <source  src={secureUrl} type='video/mp4' allow='autoplay'/>
        </video>
        <h3 onClick={handleClick} onDoubleClick={handleDoubleClick}>{children ||'VIDTube'}</h3>

    </div>
  )
}

export default TextLogo