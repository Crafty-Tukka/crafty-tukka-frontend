import React from 'react';
import {Container, Typography} from '@mui/material';
import './SideBarContainer.css';

function SideBarContainer({title, children}) {
  return (
    <Container className="sidebar-container" sx={{display: {xs: 'none', md: 'block'}}}>
      <Typography component="div" variant="h4">
        {title}
      </Typography>
      {children}
    </Container>
  );
}

export default SideBarContainer;
