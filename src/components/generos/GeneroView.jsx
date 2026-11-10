import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { listarGeneros, eliminarGenero } from '../../services/generoService';
import { GeneroForm } from './GeneroForm';
import { Modal } from '../ui/Modal';
import { EstadoBadge } from '../ui/EstadoBadge';
import { confirmarEliminar, mostrarCargando, mostrarError, mostrarExito, formatearFecha } from '../../helpers/mensajes';

export const GeneroView = () => {
  const [generos, setGeneros] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  // si generoEditar es null el formulario crea, si tiene datos actualiza
  const [generoEditar, setGeneroEditar] = useState(null);

  const cargarGeneros = async (conSpinner = true) => {
    try {
      // despues de guardar o eliminar se recarga sin spinner para no tapar el mensaje de exito
      if (conSpinner) mostrarCargando('Cargando géneros...');
      const { data } = await listarGeneros();
      setGeneros(data);
      if (conSpinner) Swal.close();
    } catch (error) {
      mostrarError(error);
    }
  };

  useEffect(() => {
    cargarGeneros();
  }, []);

  const handleNuevo = () => {
    setGeneroEditar(null);
    setAbrirModal(true);
  };

  const handleEditar = (genero) => {
    setGeneroEditar(genero);
    setAbrirModal(true);
  };

  const handleEliminar = async (genero) => {
    const confirmado = await confirmarEliminar(genero.nombre);
    if (!confirmado) return;
    try {
      mostrarCargando('Eliminando...');
      await eliminarGenero(genero._id);
      mostrarExito('Género eliminado');
      cargarGeneros(false);
    } catch (error) {
      mostrarError(error);
    }
  };

  const handleGuardado = () => {
    setAbrirModal(false);
    cargarGeneros(false);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Géneros</h2>
        <button className="btn btn-primary" onClick={handleNuevo}>+ Nuevo género</button>
      </div>

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Creación</th>
                <th>Actualización</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {generos.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">No hay géneros registrados</td>
                </tr>
              )}
              {generos.map((genero, index) => (
                <tr key={genero._id}>
                  <td>{index + 1}</td>
                  <td>{genero.nombre}</td>
                  <td>{genero.descripcion}</td>
                  <td><EstadoBadge estado={genero.estado} /></td>
                  <td className="text-nowrap small">{formatearFecha(genero.fechaCreacion)}</td>
                  <td className="text-nowrap small">{formatearFecha(genero.fechaActualizacion)}</td>
                  <td className="text-end text-nowrap">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditar(genero)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(genero)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {abrirModal && (
        <Modal titulo={generoEditar ? 'Editar género' : 'Nuevo género'} onCerrar={() => setAbrirModal(false)}>
          <GeneroForm genero={generoEditar} onGuardado={handleGuardado} onCancelar={() => setAbrirModal(false)} />
        </Modal>
      )}
    </div>
  );
};
