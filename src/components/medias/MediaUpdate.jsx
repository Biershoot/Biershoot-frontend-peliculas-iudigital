import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { consultarMediaPorId } from '../../services/mediaService';
import { MediaForm } from './MediaForm';
import { mostrarCargando, mostrarError } from '../../helpers/mensajes';

// pantalla para editar una pelicula o serie, el id llega por la url (/medias/editar/:mediaId)
export const MediaUpdate = () => {
  const { mediaId } = useParams();
  const navigate = useNavigate();
  const [media, setMedia] = useState(null);

  const cargarMedia = async () => {
    try {
      mostrarCargando('Cargando producción...');
      const { data } = await consultarMediaPorId(mediaId);
      setMedia(data);
      Swal.close();
    } catch (error) {
      mostrarError(error);
      navigate('/medias');
    }
  };

  useEffect(() => {
    cargarMedia();
  }, [mediaId]);

  const volver = () => navigate('/medias');

  return (
    <div className="container py-4">
      <h2 className="h4 mb-3">Editar producción</h2>
      {media && (
        <div className="row">
          <div className="col-md-3 mb-3">
            <img
              src={media.imagen || 'https://placehold.co/400x600?text=Sin+imagen'}
              alt={media.titulo}
              className="img-fluid rounded shadow-sm"
            />
          </div>
          <div className="col-md-9">
            <div className="card shadow-sm">
              <div className="card-body">
                <MediaForm media={media} onGuardado={volver} onCancelar={volver} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
