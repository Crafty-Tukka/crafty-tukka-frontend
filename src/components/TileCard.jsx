import React from 'react';
import {
  Card,
  CardActions,
  // CardContent,
  CardHeader,
  CardMedia,
  Chip
  // Typography
} from '@mui/material';

function TileCard({imgPath, item, children}) {
  return (
    <Card sx={{width: 340, m: 2}}>
      <CardMedia component="img" alt="image" height="140" image={imgPath} />
      <CardHeader title={item.name} subheader={item.website && item.website} />
      {/* <CardContent> */}
      {/* <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography> */}
      {/* <Typography sx={{margin: 0, overflow: 'hidden'}} variant="body2" color="text.secondary">
          {item.description}
        </Typography> */}
      {/* {item.email ? <Typography variant="body2">Email: {item.email}</Typography> : null}
        {item.mobile ? <Typography variant="body2">Mobile: {item.mobile}</Typography> : null} */}
      {/* </CardContent> */}
      <CardActions sx={{marginBottom: 1, pt: 0, pl: 2}}>
        {item.category ? (
          <Chip size="small" label={item.category} color="secondary" variant="outlined" />
        ) : null}
      </CardActions>
    </Card>
  );
}

export default TileCard;
