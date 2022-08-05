import {Box, Card, CardContent, CardMedia} from '@mui/material';
import React from 'react';

function PreviewCard({imgPath, item, children}) {
  return (
    <Card
      sx={{
        display: 'flex',
        minHeight: 180,
        flexDirection: {xs: 'column', md: 'row'},
        alignItems: 'center'
      }}
    >
      <CardMedia
        component="img"
        sx={{maxWidth: '50% '}}
        display="flex"
        image={imgPath}
        alt="image"
      />
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <CardContent sx={{flex: '1 0 auto'}}>{children}</CardContent>
      </Box>
    </Card>
  );
}

export default PreviewCard;
