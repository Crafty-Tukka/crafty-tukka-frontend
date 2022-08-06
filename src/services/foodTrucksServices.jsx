import craftyTukkaAPI from 'config/api';

export async function getFoodTrucks() {
  const response = await craftyTukkaAPI.get('/foodtrucks');
  return response.data;
}

export async function getFoodTruckEvents(id) {
  const response = await craftyTukkaAPI.get(`/events/foodtrucks/${id}`);
  return response.data;
}

export async function getPendingFoodTruckEvents(id) {
  const response = await craftyTukkaAPI.get(`/events/foodtrucks/${id}/pending`);
  return response.data;
}

export async function deleteFoodtruck(id) {
  const response = await craftyTukkaAPI.delete(`/foodtrucks/${id}`);
  return response.data;
}
