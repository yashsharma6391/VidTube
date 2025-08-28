
import './App.css';
import Video from './Pages/Videos/Video';
import Navbar from './component/Navbar/Navbar';
import Home from './Pages/Home/Home';
import { useState, useEffect} from 'react';
import {Route,Routes} from 'react-router-dom';
import Profile from './Pages/Profile/Profile';
import VideoUpload from './Pages/VideoUpload/VideoUpload';
import SignUp from './Pages/SignUp/SignUp';
import axios from 'axios';
import SearchResults from './component/HomePage/SearchResults';
import Footer from './component/Footer/Footer';
import TextLogo from './component/Navbar/TextLogo';
import SplashScreen from './component/SplashScreen/SplashScreen';


function App() {
  const [sideNavbar,setSideNavbar] = useState(true);
  const [showSplash, setShowSplash] = useState(false);

 
   useEffect(() => {
    const splashCompleted = sessionStorage.getItem("splashCompleted");
    if (!splashCompleted) {
      setShowSplash(true);
    }
  }, []);

  const handleSplashFinish = () => {
    sessionStorage.setItem("splashCompleted", "true");
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  
  const setSideNavbarfunc =(value)=>{
       setSideNavbar(value)
  }

  return (
    <div className='App'>
      {/* <TextLogo/> */}
      <Footer/>
      <Navbar setSideNavbarfunc={setSideNavbarfunc} sideNavbar={sideNavbar}/>
      <Routes>
        <Route path='/' element={<Home sideNavbar={sideNavbar}/>}/>
        <Route path='/search'element={<SearchResults sideNavbar={sideNavbar}/>}/>
        <Route path='/watch/:id' element={<Video setSideNavbarfunc={setSideNavbarfunc} sideNavbar={sideNavbar}/>}/>
        <Route path='/user/:id' element={<Profile sideNavbar={sideNavbar}/>}/>
        <Route path='/:id/upload' element={<VideoUpload/>} />
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
      
    </div>
    
  
  )
}

export default App
