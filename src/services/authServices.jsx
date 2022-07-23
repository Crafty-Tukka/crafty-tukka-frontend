import craftyTukkaAPI from 'config/api';

export async function signUpVenue(data) {
  const response = await craftyTukkaAPI.post('/auth/venues/signup', data);
  console.log(response.data);
  return response.data;
}

export async function signInVenue(data) {
  const response = await craftyTukkaAPI.post('/auth/venues/signin', data);
  console.log(response.data);
  return response.data;
}

export async function signUpFoodTruck(data) {
  const response = await craftyTukkaAPI.post('/auth/foodtrucks/signup', data);
  console.log(response.data);
  return response.data;
}
