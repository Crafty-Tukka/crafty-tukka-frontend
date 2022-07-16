import {useGlobalState} from 'utils/stateContext';
import List from 'components/List';
import {Typography} from '@mui/material';
import PreviewCard from 'components/PreviewCard';

function Events() {
  const {store} = useGlobalState();
  const {confirmedEvents} = store;
  console.log(confirmedEvents);

  const eventImg =
    'https://cdn.shopify.com/s/files/1/0619/1700/3994/files/Ballistic-Beer-Our-Story-About-Us-1.jpg?crop=top&height=275&v=1650431502&width=275';

  return (
    <div className="container">
      <div className="controls">
        <List title="Events">
          {confirmedEvents.map((event) => {
            return event.confirmed_status === 'confirmed' ? (
              <PreviewCard key={event.id} imgPath={eventImg} item={event} routePath={'events'}>
                <Typography component="div" variant="h6">
                  {event.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {event.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.start}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.finish}
                </Typography>
              </PreviewCard>
            ) : null;
          })}
        </List>
      </div>
      <div className="map">
        <GoogleMap
          zoom={12}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        ></GoogleMap>
      </div>
    </div>
  );
}

export default Events;
