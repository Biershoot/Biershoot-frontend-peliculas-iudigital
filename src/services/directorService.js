import { axiosInstance } from '../config/axiosConfig';

// servicios que consumen la ruta /director de la API

const listarDirectores = () => {
  return axiosInstance.get('director');
};

const crearDirector = (data) => {
  return axiosInstance.post('director', data);
};

const actualizarDirector = (id, data) => {
  return axiosInstance.put(`director/${id}`, data);
};

const consultarDirectorPorId = (id) => {
  return axiosInstance.get(`director/${id}`);
};

const eliminarDirector = (id) => {
  return axiosInstance.delete(`director/${id}`);
};

const listarDirectoresActivos = () => {
  return axiosInstance.get('director/activos');
};

export { listarDirectores, listarDirectoresActivos, crearDirector, actualizarDirector, consultarDirectorPorId, eliminarDirector };
