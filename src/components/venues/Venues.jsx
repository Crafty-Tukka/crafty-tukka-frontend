import {useGlobalState} from 'utils/stateContext';
import {Typography} from '@mui/material';
import PageContainer from 'components/Containers/PageContainer';
import LinkedCard from 'components/LinkedCard';

function Venues() {
  const {store} = useGlobalState();
  const {venues} = store;
  console.log(venues);

  return (
    <PageContainer title="Breweries">
      {venues.map((venue) => {
        return (
          <LinkedCard key={venue.id} imgPath={venue.picture_url} item={venue} routePath={'venues'}>
            <Typography component="div" variant="h6" className="h6">
              {venue.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {venue.description}
            </Typography>
            {venue.location && (
              <Typography variant="body2" color="text.secondary">
                {venue.location.address1}, {venue.location.city}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              {venue.facebook}
            </Typography>
          </LinkedCard>
        );
      })}
    </PageContainer>
  );
}

export default Venues;
