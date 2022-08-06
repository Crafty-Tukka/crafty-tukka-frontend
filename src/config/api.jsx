import axios from 'axios';

// const craftyTukkaAPI = axios.create({baseURL: 'http://localhost:5000/'});
const craftyTukkaAPI = axios.create({baseURL: 'https://crafty-tukka-api.herokuapp.com/'});

craftyTukkaAPI.interceptors.request.use((req) => {
  // send the token in the request
  const token = sessionStorage.getItem('token');
  if (token) {
    req.headers['Authorization'] = `Bearer ${token}`;
  }

  return req;
});

export default craftyTukkaAPI;
