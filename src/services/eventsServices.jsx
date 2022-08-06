import craftyTukkaAPI from 'config/api';

export async function getEvents() {
  const response = await craftyTukkaAPI.get('/events');
  return response.data;
}

export async function getEvent(id) {
  const response = await craftyTukkaAPI.get(`/events/${id}`);
  return response.data;
}

export async function createVenueEvent(data) {
  const response = await craftyTukkaAPI.post('/events/venuecreate', data);
  return response.data;
}

export async function createTruckEvent(data) {
  const response = await craftyTukkaAPI.post('/events/truckcreate', data);
  return response.data;
}

export async function editEvent(data, id) {
  const response = await craftyTukkaAPI.put(`/events/${id}`, data);
  return response.data;
}

export async function deleteEvent(id) {
  const response = await craftyTukkaAPI.delete(`/events/${id}`);
  return response.data;
}
