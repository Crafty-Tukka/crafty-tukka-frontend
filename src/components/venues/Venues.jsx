import {useGlobalState} from 'utils/stateContext';
import List from 'components/List';
import {Typography} from '@mui/material';
import PreviewCard from 'components/PreviewCard';

function Venues() {
  const {store} = useGlobalState();
  const {venues} = store;
  console.log(venues);

  const venueImg =
    'https://cdn.shopify.com/s/files/1/0619/1700/3994/files/Ballistic-Beer-Our-Story-About-Us-1.jpg?crop=top&height=275&v=1650431502&width=275';
  return (
    <List title="Venues">
      {venues.map((venue) => {
        return (
          <PreviewCard key={venue.id} imgPath={venueImg} item={venue} routePath={'venues'}>
            <Typography component="div" variant="h6">
              {venue.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {venue.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {venue.location.address1}, {venue.location.city}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {venue.facebook}
            </Typography>
          </PreviewCard>
        );
      })}
    </List>
  );
}

export default Venues;
