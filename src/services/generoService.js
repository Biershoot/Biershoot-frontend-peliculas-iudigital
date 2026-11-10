import { axiosInstance } from '../config/axiosConfig';

// servicios que consumen la ruta /genero de la API

const listarGeneros = () => {
  return axiosInstance.get('genero');
};

const crearGenero = (data) => {
  return axiosInstance.post('genero', data);
};

const actualizarGenero = (id, data) => {
  return axiosInstance.put(`genero/${id}`, data);
};

const consultarGeneroPorId = (id) => {
  return axiosInstance.get(`genero/${id}`);
};

const eliminarGenero = (id) => {
  return axiosInstance.delete(`genero/${id}`);
};

const listarGenerosActivos = () => {
  return axiosInstance.get('genero/activos');
};

export { listarGeneros, listarGenerosActivos, crearGenero, actualizarGenero, consultarGeneroPorId, eliminarGenero };
