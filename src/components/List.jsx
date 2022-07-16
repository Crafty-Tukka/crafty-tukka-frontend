import {Typography} from '@mui/material';
import React from 'react';

function List({title, children}) {
  return (
    <>
      <Typography component="div" variant="h4">
        {title}
      </Typography>
      {children}
    </>
  );
}

export default List;
