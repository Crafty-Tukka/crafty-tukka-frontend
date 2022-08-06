import craftyTukkaAPI from 'config/api';

export async function getVenues() {
  const response = await craftyTukkaAPI.get('/venues');
  return response.data;
}

export async function getVenueEvents(id) {
  const response = await craftyTukkaAPI.get(`/events/venues/${id}`);
  return response.data;
}

export async function getPendingVenueEvents(id) {
  const response = await craftyTukkaAPI.get(`/events/venues/${id}/pending`);
  return response.data;
}

export async function deleteVenue(id) {
  const response = await craftyTukkaAPI.delete(`/venues/${id}`);
  return response.data;
}
