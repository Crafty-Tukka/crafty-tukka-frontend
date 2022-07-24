import craftyTukkaAPI from 'config/api';

export async function getVenues() {
  const response = await craftyTukkaAPI.get('/venues');
  console.log(response.data);
  return response.data;
}

export async function getVenueEvents(id) {
  const response = await craftyTukkaAPI.get(`/events/venues/${id}`);
  console.log(response.data);
  return response.data;
}

export async function getPendingVenueEvents(id) {
  const response = await craftyTukkaAPI.get(`/events/venues/${id}/pending`);
  console.log(response.data);
  return response.data;
}

export async function deleteVenue(id) {
  const response = await craftyTukkaAPI.delete(`/venues/${id}`);
  console.log(response.data);
  return response.data;
}
