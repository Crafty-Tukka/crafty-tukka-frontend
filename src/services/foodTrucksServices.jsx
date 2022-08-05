import craftyTukkaAPI from 'config/api';

export async function getFoodTrucks() {
  const response = await craftyTukkaAPI.get('/foodtrucks');
  console.log(response.data);
  return response.data;
}

export async function getFoodTruckEvents(id) {
  const response = await craftyTukkaAPI.get(`/events/foodtrucks/${id}`);
  console.log(response.data);
  return response.data;
}

export async function getPendingFoodTruckEvents(id) {
  const response = await craftyTukkaAPI.get(`/events/foodtrucks/${id}/pending`);
  console.log(response.data);
  return response.data;
}

export async function deleteFoodtruck(id) {
  const response = await craftyTukkaAPI.delete(`/foodtrucks/${id}`);
  console.log(response.data);
  return response.data;
}
