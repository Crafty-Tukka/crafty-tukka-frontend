import craftyTukkaAPI from 'config/api';

export async function getFoodTrucks() {
  const response = await craftyTukkaAPI.get('/foodtrucks');
  console.log(response.data);
  return response.data;
}
