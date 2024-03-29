import React from 'react';
import {Link} from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Details from './Details';
import TileCard from './TileCard';
import PreviewCard from './PreviewCard';
import {Container} from '@mui/material';

function LinkedCard({imgPath, item, routePath, children}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => (!open ? setOpen(true) : null);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Link to="" onClick={handleOpen} style={{textDecoration: 'none', margin: '4px'}}>
        {item.date ? (
          <PreviewCard imgPath={item.picture_url} item={item}>
            {children}
          </PreviewCard>
        ) : (
          <TileCard imgPath={item.picture_url} item={item} />
        )}
      </Link>
      {/* Pop up model to display item information */}
      <Modal
        disableEnforceFocus
        open={open}
        onClose={handleClose}
        style={{outline: 0}}
        sx={{overflow: 'scroll'}}
      >
        <Details item={item} imgPath={item.picture_url} handleClose={handleClose}></Details>
      </Modal>
    </>
  );
}

export default LinkedCard;
