import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { listarDirectores, eliminarDirector } from '../../services/directorService';
import { DirectorForm } from './DirectorForm';
import { Modal } from '../ui/Modal';
import { EstadoBadge } from '../ui/EstadoBadge';
import { confirmarEliminar, mostrarCargando, mostrarError, mostrarExito, formatearFecha } from '../../helpers/mensajes';

export const DirectorView = () => {
  const [directores, setDirectores] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  const [directorEditar, setDirectorEditar] = useState(null);

  const cargarDirectores = async (conSpinner = true) => {
    try {
      // despues de guardar o eliminar se recarga sin spinner para no tapar el mensaje de exito
      if (conSpinner) mostrarCargando('Cargando directores...');
      const { data } = await listarDirectores();
      setDirectores(data);
      if (conSpinner) Swal.close();
    } catch (error) {
      mostrarError(error);
    }
  };

  useEffect(() => {
    cargarDirectores();
  }, []);

  const handleNuevo = () => {
    setDirectorEditar(null);
    setAbrirModal(true);
  };

  const handleEditar = (director) => {
    setDirectorEditar(director);
    setAbrirModal(true);
  };

  const handleEliminar = async (director) => {
    const confirmado = await confirmarEliminar(director.nombres);
    if (!confirmado) return;
    try {
      mostrarCargando('Eliminando...');
      await eliminarDirector(director._id);
      mostrarExito('Director eliminado');
      cargarDirectores(false);
    } catch (error) {
      mostrarError(error);
    }
  };

  const handleGuardado = () => {
    setAbrirModal(false);
    cargarDirectores(false);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Directores</h2>
        <button className="btn btn-primary" onClick={handleNuevo}>+ Nuevo director</button>
      </div>

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nombres</th>
                <th>Estado</th>
                <th>Creación</th>
                <th>Actualización</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {directores.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">No hay directores registrados</td>
                </tr>
              )}
              {directores.map((director, index) => (
                <tr key={director._id}>
                  <td>{index + 1}</td>
                  <td>{director.nombres}</td>
                  <td><EstadoBadge estado={director.estado} /></td>
                  <td className="text-nowrap small">{formatearFecha(director.fechaCreacion)}</td>
                  <td className="text-nowrap small">{formatearFecha(director.fechaActualizacion)}</td>
                  <td className="text-end text-nowrap">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditar(director)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(director)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {abrirModal && (
        <Modal titulo={directorEditar ? 'Editar director' : 'Nuevo director'} onCerrar={() => setAbrirModal(false)}>
          <DirectorForm director={directorEditar} onGuardado={handleGuardado} onCancelar={() => setAbrirModal(false)} />
        </Modal>
      )}
    </div>
  );
};
