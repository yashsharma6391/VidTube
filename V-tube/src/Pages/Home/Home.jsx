import React from 'react'
import SideNavbar from '../../component/SideNavbar/SideNavbar'
import HomePage from '../../component/HomePage/HomePage'
import './home.css'
const Home = ({sideNavbar,setSideNavbarfunc}) => {
  return (
    <div className='home'>
        <SideNavbar sideNavbar={sideNavbar}/>
        <HomePage  sideNavbar={sideNavbar}/>
    </div>
  )
}

export default Home