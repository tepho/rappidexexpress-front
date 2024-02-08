import axios from 'axios';

let apiUrl = 'http://localhost:3000/api'
if (process.env.ENVIRIONMENT === 'PROD'){
    apiUrl = 'https://rappidex-api-eef82025324b.herokuapp.com/api'
}

const api = axios.create({
    
    baseURL: apiUrl,
});

export default api;