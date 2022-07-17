import React from 'react';
import {Card, CardActions, CardContent, CardMedia, Chip, Typography} from '@mui/material';

function TileCard({imgPath, item, children}) {
  return (
    <Card sx={{maxWidth: 345, minWidth: 240, m: 2, minHeight: 300}}>
      <CardMedia component="img" alt="image" height="140" image={imgPath} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        {item.category ? <Chip label={item.category} color="secondary" variant="outlined" /> : null}
      </CardActions>
    </Card>
  );
}

export default TileCard;
