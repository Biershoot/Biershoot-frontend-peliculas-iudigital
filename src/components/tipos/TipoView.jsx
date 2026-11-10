import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { listarTipos, eliminarTipo } from '../../services/tipoService';
import { TipoForm } from './TipoForm';
import { Modal } from '../ui/Modal';
import { confirmarEliminar, mostrarCargando, mostrarError, mostrarExito, formatearFecha } from '../../helpers/mensajes';

export const TipoView = () => {
  const [tipos, setTipos] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  const [tipoEditar, setTipoEditar] = useState(null);

  const cargarTipos = async (conSpinner = true) => {
    try {
      // despues de guardar o eliminar se recarga sin spinner para no tapar el mensaje de exito
      if (conSpinner) mostrarCargando('Cargando tipos...');
      const { data } = await listarTipos();
      setTipos(data);
      if (conSpinner) Swal.close();
    } catch (error) {
      mostrarError(error);
    }
  };

  useEffect(() => {
    cargarTipos();
  }, []);

  const handleNuevo = () => {
    setTipoEditar(null);
    setAbrirModal(true);
  };

  const handleEditar = (tipo) => {
    setTipoEditar(tipo);
    setAbrirModal(true);
  };

  const handleEliminar = async (tipo) => {
    const confirmado = await confirmarEliminar(tipo.nombre);
    if (!confirmado) return;
    try {
      mostrarCargando('Eliminando...');
      await eliminarTipo(tipo._id);
      mostrarExito('Tipo eliminado');
      cargarTipos(false);
    } catch (error) {
      mostrarError(error);
    }
  };

  const handleGuardado = () => {
    setAbrirModal(false);
    cargarTipos(false);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Tipos</h2>
        <button className="btn btn-primary" onClick={handleNuevo}>+ Nuevo tipo</button>
      </div>

      {/* el tipo no maneja estado segun el caso de estudio */}
      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Creación</th>
                <th>Actualización</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tipos.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">No hay tipos registrados</td>
                </tr>
              )}
              {tipos.map((tipo, index) => (
                <tr key={tipo._id}>
                  <td>{index + 1}</td>
                  <td>{tipo.nombre}</td>
                  <td>{tipo.descripcion}</td>
                  <td className="text-nowrap small">{formatearFecha(tipo.fechaCreacion)}</td>
                  <td className="text-nowrap small">{formatearFecha(tipo.fechaActualizacion)}</td>
                  <td className="text-end text-nowrap">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditar(tipo)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(tipo)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {abrirModal && (
        <Modal titulo={tipoEditar ? 'Editar tipo' : 'Nuevo tipo'} onCerrar={() => setAbrirModal(false)}>
          <TipoForm tipo={tipoEditar} onGuardado={handleGuardado} onCancelar={() => setAbrirModal(false)} />
        </Modal>
      )}
    </div>
  );
};
