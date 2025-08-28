// components/Sidebar/SidebarItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SidebarItem = ({ to, icon: Icon, label, isImage }) => {
  const content = (
    <>
      {isImage ? (
        <img className="home_sideNavbar_ImgLogo" src={Icon} alt={label} />
      ) : (
        <Icon sx={{ color: "white" }} />
      )}
      <div className="home_sideNavbarTopOptionTitle">{label}</div>
    </>
  );

  return to ? (
    <Link to={to} className="home_sideNavbarTopOption">
      {content}
    </Link>
  ) : (
    <div className="home_sideNavbarTopOption">{content}</div>
  );
};

export default SidebarItem;
