import axios from 'axios';

let api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export default api;