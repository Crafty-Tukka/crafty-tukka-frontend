import {Box, Card, CardContent, CardMedia} from '@mui/material';
import React from 'react';

function PreviewCard({imgPath, item, children}) {
  return (
    <Card
      sx={{
        display: 'flex',
        maxHeight: '60%',
        // flexDirection: {xs: 'column', md: 'row'},
        alignItems: 'center'
      }}
    >
      <CardMedia component="img" sx={{width: 151}} image={imgPath} alt="image" />
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <CardContent sx={{flex: '1 0 auto'}}>{children}</CardContent>
      </Box>
    </Card>
  );
}

export default PreviewCard;
