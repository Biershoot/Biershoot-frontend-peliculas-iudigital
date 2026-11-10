import axios from 'axios';

// la url de la API se toma del .env, si no existe se usa la del puerto 4000
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { axiosInstance };
