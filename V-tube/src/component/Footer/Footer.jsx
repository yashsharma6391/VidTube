// components/MobileFooter.jsx
import React from 'react';

import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import './Footer.css';
import SidebarItem from '../SideNavbar/SidebarItem';
import { topMenu } from '../SideNavbar/sidebarItems';

const Footer = () => {
  return (
    <div className="mobile-footer">
        
      <SidebarItem to="/" icon={HomeIcon} label="Home" className="footer-item"/>
      <SidebarItem to="/8900/upload" icon={VideocamIcon} label="Shorts" />
      <SidebarItem to="/subscriptions" icon={SubscriptionsIcon} label="Subs" />
    </div>
  );
};

export default Footer;
