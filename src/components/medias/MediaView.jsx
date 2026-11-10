import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { listarMedias, eliminarMedia } from '../../services/mediaService';
import { MediaCard } from './MediaCard';
import { MediaForm } from './MediaForm';
import { Modal } from '../ui/Modal';
import { confirmarEliminar, mostrarCargando, mostrarError, mostrarExito } from '../../helpers/mensajes';

export const MediaView = () => {
  const [medias, setMedias] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState('Todos');
  const navigate = useNavigate();

  const cargarMedias = async (conSpinner = true) => {
    try {
      // despues de guardar o eliminar se recarga sin spinner para no tapar el mensaje de exito
      if (conSpinner) mostrarCargando('Cargando películas y series...');
      const { data } = await listarMedias();
      setMedias(data);
      if (conSpinner) Swal.close();
    } catch (error) {
      mostrarError(error);
    }
  };

  useEffect(() => {
    cargarMedias();
  }, []);

  const handleEliminar = async (media) => {
    const confirmado = await confirmarEliminar(media.titulo);
    if (!confirmado) return;
    try {
      mostrarCargando('Eliminando...');
      await eliminarMedia(media._id);
      mostrarExito('Producción eliminada');
      cargarMedias(false);
    } catch (error) {
      mostrarError(error);
    }
  };

  const handleGuardado = () => {
    setAbrirModal(false);
    cargarMedias(false);
  };

  // los nombres de los tipos salen de las mismas medias para armar los botones de filtro
  const tiposDisponibles = ['Todos', ...new Set(medias.map((m) => m.tipo?.nombre).filter(Boolean))];
  const mediasFiltradas = filtroTipo === 'Todos'
    ? medias
    : medias.filter((m) => m.tipo?.nombre === filtroTipo);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Películas y series</h2>
        <button className="btn btn-primary" onClick={() => setAbrirModal(true)}>+ Nueva producción</button>
      </div>

      <div className="btn-group mb-3">
        {tiposDisponibles.map((t) => (
          <button key={t} type="button"
            className={`btn btn-sm ${filtroTipo === t ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setFiltroTipo(t)}>
            {t}
          </button>
        ))}
      </div>

      {mediasFiltradas.length === 0 && (
        <div className="alert alert-light border text-center">No hay producciones registradas</div>
      )}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
        {mediasFiltradas.map((media) => (
          <MediaCard
            key={media._id}
            media={media}
            onEditar={() => navigate(`/medias/editar/${media._id}`)}
            onEliminar={() => handleEliminar(media)}
          />
        ))}
      </div>

      {abrirModal && (
        <Modal titulo="Nueva producción" onCerrar={() => setAbrirModal(false)}>
          <MediaForm onGuardado={handleGuardado} onCancelar={() => setAbrirModal(false)} />
        </Modal>
      )}
    </div>
  );
};
