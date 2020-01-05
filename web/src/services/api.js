import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://localhost:3333',
    baseURL: 'http://192.168.15.13:3333',
    //baseURL: 'http://10.0.84.208:3333',
});

export default api;