// components/Sidebar/SidebarSection.jsx
import React from 'react';

const SidebarSection = ({ title, children }) => {
  return (
    <div className="home_sideNavbarMiddle">
      {title && (
        <div className="home_sideNavbarTopOption">
          <div className="home_sideNavbarTopOptionTitleHeader">{title}</div>
        </div>
      )}
      {children}
    </div>
  );
};

export default SidebarSection;
