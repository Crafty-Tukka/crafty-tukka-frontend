import craftyTukkaAPI from 'config/api';

export async function signUpVenue(data) {
  const response = await craftyTukkaAPI.post('/auth/venues/signup', data);
  return response.data;
}

export async function signInVenue(data) {
  const response = await craftyTukkaAPI.post('/auth/venues/signin', data);
  return response.data;
}

export async function editVenue(data, id) {
  const response = await craftyTukkaAPI.put(`/auth/venues/${id}`, data);
  return response.data;
}

export async function signUpFoodTruck(data) {
  const response = await craftyTukkaAPI.post('/auth/foodtrucks/signup', data);
  return response.data;
}

export async function signInFoodTruck(data) {
  const response = await craftyTukkaAPI.post('/auth/foodtrucks/signin', data);
  return response.data;
}

export async function editFoodTruck(data, id) {
  const response = await craftyTukkaAPI.put(`/auth/foodtrucks/${id}`, data);
  return response.data;
}
