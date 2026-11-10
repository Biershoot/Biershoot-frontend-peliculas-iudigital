import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { listarProductoras, eliminarProductora } from '../../services/productoraService';
import { ProductoraForm } from './ProductoraForm';
import { Modal } from '../ui/Modal';
import { EstadoBadge } from '../ui/EstadoBadge';
import { confirmarEliminar, mostrarCargando, mostrarError, mostrarExito, formatearFecha } from '../../helpers/mensajes';

export const ProductoraView = () => {
  const [productoras, setProductoras] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  const [productoraEditar, setProductoraEditar] = useState(null);

  const cargarProductoras = async (conSpinner = true) => {
    try {
      // despues de guardar o eliminar se recarga sin spinner para no tapar el mensaje de exito
      if (conSpinner) mostrarCargando('Cargando productoras...');
      const { data } = await listarProductoras();
      setProductoras(data);
      if (conSpinner) Swal.close();
    } catch (error) {
      mostrarError(error);
    }
  };

  useEffect(() => {
    cargarProductoras();
  }, []);

  const handleNuevo = () => {
    setProductoraEditar(null);
    setAbrirModal(true);
  };

  const handleEditar = (productora) => {
    setProductoraEditar(productora);
    setAbrirModal(true);
  };

  const handleEliminar = async (productora) => {
    const confirmado = await confirmarEliminar(productora.nombre);
    if (!confirmado) return;
    try {
      mostrarCargando('Eliminando...');
      await eliminarProductora(productora._id);
      mostrarExito('Productora eliminada');
      cargarProductoras(false);
    } catch (error) {
      mostrarError(error);
    }
  };

  const handleGuardado = () => {
    setAbrirModal(false);
    cargarProductoras(false);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Productoras</h2>
        <button className="btn btn-primary" onClick={handleNuevo}>+ Nueva productora</button>
      </div>

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Slogan</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Actualización</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productoras.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">No hay productoras registradas</td>
                </tr>
              )}
              {productoras.map((productora, index) => (
                <tr key={productora._id}>
                  <td>{index + 1}</td>
                  <td>{productora.nombre}</td>
                  <td className="fst-italic">{productora.slogan}</td>
                  <td>{productora.descripcion}</td>
                  <td><EstadoBadge estado={productora.estado} /></td>
                  <td className="text-nowrap small">{formatearFecha(productora.fechaActualizacion)}</td>
                  <td className="text-end text-nowrap">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditar(productora)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(productora)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {abrirModal && (
        <Modal titulo={productoraEditar ? 'Editar productora' : 'Nueva productora'} onCerrar={() => setAbrirModal(false)}>
          <ProductoraForm productora={productoraEditar} onGuardado={handleGuardado} onCancelar={() => setAbrirModal(false)} />
        </Modal>
      )}
    </div>
  );
};
