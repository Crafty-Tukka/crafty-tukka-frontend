// not sure if this is still being used?

import {Box, Card, CardContent, CardMedia} from '@mui/material';
import React from 'react';
import {Link} from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Details from './Details';
// import {useGlobalState} from 'utils/stateContext';

function PreviewCard({imgPath, item, routePath, children}) {
  // const {store} = useGlobalState();
  // const {venues} = store;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => (!open ? setOpen(true) : null);
  const handleClose = () => setOpen(false);

  const getImg = () => {
    // this checks if item is an event and searches for associated venue img
    if (item.date) {
      // let venue;
      // venue = venues.find((venue) => venue.id === item.venue_id);
      // return venue.img;

      // comment this out once venues have profile pics
      return 'https://cdn.shopify.com/s/files/1/0619/1700/3994/files/Ballistic-Beer-Our-Story-About-Us-1.jpg?crop=top&height=275&v=1650431502&width=275';
      // if its a food truck or venue it will have an img attached
    } else {
      // return item.img;

      // comment this out once venues/food trucks have an img
      return 'https://cdn.shopify.com/s/files/1/0619/1700/3994/files/Ballistic-Beer-Our-Story-About-Us-1.jpg?crop=top&height=275&v=1650431502&width=275';
    }
  };

  const img = getImg();

  return (
    // this routes to Event page and may not be needed anymore as we are using a pop-up modal
    // <Link to={`/${routePath}/${item.id}`} style={{textDecoration: 'none', margin: '4px'}}>
    <Link to="" onClick={handleOpen} style={{textDecoration: 'none', margin: '4px'}}>
      <Card sx={{display: 'flex'}}>
        <CardMedia
          component="img"
          sx={{width: 151}}
          image={img}
          alt="Live from space album cover"
        />
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <CardContent sx={{flex: '1 0 auto'}}>{children}</CardContent>
        </Box>
      </Card>
      {/* Pop up model to display item information */}
      <Modal open={open} onClose={handleClose}>
        <Details item={item} imgPath={img} handleClose={handleClose}></Details>
      </Modal>
    </Link>
  );
}

export default PreviewCard;
