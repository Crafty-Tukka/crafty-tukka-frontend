import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, Chip} from '@mui/material';

function TileCard({imgPath, item, children}) {
  return (
    <Card
      sx={{
        width: 200,
        height: 350,
        m: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <CardMedia component="img" alt="image" height="200" image={imgPath} />
      <CardHeader
        title={item.name}
        // subheader={item.website && item.website}
        sx={{display: 'flex', justifyContent: 'center'}}
      />
      <CardActions sx={{marginBottom: 1, pt: 0, pl: 2}}>
        {item.category ? (
          <Chip size="small" label={item.category} color="secondary" variant="outlined" />
        ) : null}
      </CardActions>
    </Card>
  );
}

export default TileCard;
