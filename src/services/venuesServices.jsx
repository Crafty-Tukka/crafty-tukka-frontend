import craftyTukkaAPI from 'config/api';

export async function getVenues() {
  const response = await craftyTukkaAPI.get('/venues');
  console.log(response.data);
  return response.data;
}
