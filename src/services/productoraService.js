import { axiosInstance } from '../config/axiosConfig';

// servicios que consumen la ruta /productora de la API

const listarProductoras = () => {
  return axiosInstance.get('productora');
};

const crearProductora = (data) => {
  return axiosInstance.post('productora', data);
};

const actualizarProductora = (id, data) => {
  return axiosInstance.put(`productora/${id}`, data);
};

const consultarProductoraPorId = (id) => {
  return axiosInstance.get(`productora/${id}`);
};

const eliminarProductora = (id) => {
  return axiosInstance.delete(`productora/${id}`);
};

const listarProductorasActivas = () => {
  return axiosInstance.get('productora/activas');
};

export { listarProductoras, listarProductorasActivas, crearProductora, actualizarProductora, consultarProductoraPorId, eliminarProductora };
