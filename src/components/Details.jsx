import React from 'react';
import ComputerIcon from '@mui/icons-material/Computer';
import FacebookIcon from '@mui/icons-material/Facebook';
import {Button, Card, CardActions, CardContent, CardMedia, Typography, Link} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 640,
  height: 640,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  // maxWidth: 345,
  boxShadow: 24
  // p: 4
};

function Details({item, imgPath, handleClose}) {
  return (
    <>
      <Card sx={style}>
        <CardMedia component="img" height="140" image={imgPath} alt={item.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
          {item.start ? <Typography variant="h6">Start time: {item.start}</Typography> : null}
          {item.finish ? <Typography variant="h6">Finish time: {item.finish}</Typography> : null}
          {item.location ? (
            <Typography variant="body2">
              {item.location.address1} <br /> {item.location.city}
            </Typography>
          ) : null}
          {item.category ? <Typography variant="h6">{item.category}</Typography> : null}
          <span>
            {item.facebook ? (
              <Link href={item.facebook} target="_blank" rel="noreferrer">
                <FacebookIcon />
              </Link>
            ) : null}
            {item.website ? (
              <Link href={item.website} target="_blank" rel="noreferrer">
                <ComputerIcon />
              </Link>
            ) : null}
          </span>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClose}>
            Close
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default Details;
