import craftyTukkaAPI from 'config/api';

export async function getEvents() {
  const response = await craftyTukkaAPI.get('/events');
  console.log(response.data);
  return response.data;
}
