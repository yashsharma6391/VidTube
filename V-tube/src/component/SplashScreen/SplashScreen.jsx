import React, { useEffect } from 'react'
import TextLogo from '../Navbar/TextLogo'
import './SplashScreen.css';
import {motion} from 'framer-motion';
import AnimatedLetter from './AnimationLetter';
const SplashScreen = ({onFinish}) => {
  const text = "VIDTube";
  useEffect(() => {
    const timer = setTimeout(() => {
      // setShowSplash(false);
      onFinish();
    },10000 ); // 3 sec splash

    return () => clearTimeout(timer);
  }, [onFinish]);
  return (
    
        <div className='splash-screen'>
          {text.split("").map((letter,i)=>(
            
              
 
            <div className='splash-logo' key={i} >
                <TextLogo videoUrl={'splashvideo.mp4'}>
                  {/* {letter} */}
                  <AnimatedLetter letter={letter} key={i} i={i} />
                </TextLogo>
            </div>    
            
          ))}
            
        </div>
    
  )
}

export default SplashScreen