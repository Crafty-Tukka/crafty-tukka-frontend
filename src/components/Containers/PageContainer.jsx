import React from 'react';
import {Typography} from '@mui/material';
import './PageContainer.css';

function PageContainer({title, children}) {
  return (
    <div className="page-container">
      <Typography component="div" variant="h4">
        {title}
      </Typography>
      <div className="card-container">{children}</div>
    </div>
  );
}

export default PageContainer;
