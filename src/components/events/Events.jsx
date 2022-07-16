import {useGlobalState} from 'utils/stateContext';
import Card from 'components/Card';

function Events() {
  const {store} = useGlobalState();
  const {confirmedEvents} = store;
  console.log(confirmedEvents);

  const eventImg =
    'https://cdn.shopify.com/s/files/1/0619/1700/3994/files/Ballistic-Beer-Our-Story-About-Us-1.jpg?crop=top&height=275&v=1650431502&width=275';

  return (
    <>
      <h1>Event List</h1>
      {confirmedEvents.map((event) => {
        return event.confirmed_status === 'confirmed' ? (
          // <>
          //   <h3>Name: {event.name}</h3>
          //   <p>Description: {event.description}</p>
          //   <h5>Start Time: {event.start}</h5>
          //   <h5>Finish Time: {event.finish}</h5>
          // </>
          <Card key={event.id} imgPath={eventImg} item={event} routePath={'events'}>
            <h3>Name: {event.name}</h3>
            <p>Description: {event.description}</p>
            <h5>Start Time: {event.start}</h5>
            <h5>Finish Time: {event.finish}</h5>
          </Card>
        ) : null;
      })}
    </>
  );
}

export default Events;
