import { axiosInstance } from '../config/axiosConfig';

// servicios que consumen la ruta /tipo de la API

const listarTipos = () => {
  return axiosInstance.get('tipo');
};

const crearTipo = (data) => {
  return axiosInstance.post('tipo', data);
};

const actualizarTipo = (id, data) => {
  return axiosInstance.put(`tipo/${id}`, data);
};

const consultarTipoPorId = (id) => {
  return axiosInstance.get(`tipo/${id}`);
};

const eliminarTipo = (id) => {
  return axiosInstance.delete(`tipo/${id}`);
};

export { listarTipos, crearTipo, actualizarTipo, consultarTipoPorId, eliminarTipo };
