import React from 'react';
import {Typography} from '@mui/material';
import './SideBarContainer.css';

function SideBarContainer({title, children}) {
  return (
    <div className="sidebar-container">
      <Typography component="div" variant="h4">
        {title}
      </Typography>
      {children}
    </div>
  );
}

export default SideBarContainer;
