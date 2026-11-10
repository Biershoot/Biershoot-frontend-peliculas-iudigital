import { axiosInstance } from '../config/axiosConfig';

// servicios que consumen la ruta /media de la API

const listarMedias = () => {
  return axiosInstance.get('media');
};

const crearMedia = (data) => {
  return axiosInstance.post('media', data);
};

const actualizarMedia = (id, data) => {
  return axiosInstance.put(`media/${id}`, data);
};

const consultarMediaPorId = (id) => {
  return axiosInstance.get(`media/${id}`);
};

const eliminarMedia = (id) => {
  return axiosInstance.delete(`media/${id}`);
};

export { listarMedias, crearMedia, actualizarMedia, consultarMediaPorId, eliminarMedia };
