import React from 'react';
import {Container, Typography} from '@mui/material';
import './SideBarContainer.css';

function SideBarContainer({title, children}) {
  return (
    <Container sx={{display: {xs: 'none', md: 'block'}}}>
      <div className="sidebar-container">
        <Typography component="div" variant="h4">
          {title}
        </Typography>
        {children}
      </div>
    </Container>
  );
}

export default SideBarContainer;
