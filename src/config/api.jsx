import axios from 'axios';

// creating the axios object as a base url
// this is to be refactored when calling to the deployed back end
// const craftyTukkaAPI = axios.create({baseURL: 'https://crafty-tukka-api.herokuapp.com/'});
const craftyTukkaAPI = axios.create({baseURL: 'http://localhost:5000/'});

craftyTukkaAPI.interceptors.request.use((req) => {
  // send the token in the request
  const token = sessionStorage.getItem('token');
  console.log(token);
  // Authorization -> Bearer token -> paste the token
  if (token) {
    req.headers['Authorization'] = `Bearer ${token}`;
  }

  return req;
});

export default craftyTukkaAPI;
