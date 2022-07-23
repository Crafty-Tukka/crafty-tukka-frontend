import axios from 'axios';

// creating the axios object as a base url
// this is to be refactored when calling to the deployed back end
const craftyTukkaAPI = axios.create({baseURL: 'http://localhost:5000'});

export default craftyTukkaAPI;
