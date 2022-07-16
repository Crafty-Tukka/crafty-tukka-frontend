import {Box, Card, CardContent, CardMedia} from '@mui/material';
import React from 'react';
import {Link} from 'react-router-dom';

function PreviewCard({imgPath, item, routePath, children}) {
  return (
    <Link to={`/${routePath}/${item.id}`} style={{textDecoration: 'none', margin: '4px'}}>
      <Card sx={{display: 'flex'}}>
        <CardMedia
          component="img"
          sx={{width: 151}}
          image={imgPath}
          alt="Live from space album cover"
        />
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <CardContent sx={{flex: '1 0 auto'}}>{children}</CardContent>
        </Box>
      </Card>
    </Link>
  );
}

export default PreviewCard;
