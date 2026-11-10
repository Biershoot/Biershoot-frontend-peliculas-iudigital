// imagen que se muestra cuando la media no tiene portada o el link esta roto
const SIN_IMAGEN = 'https://placehold.co/400x600?text=Sin+imagen';

export const MediaCard = ({ media, onEditar, onEliminar }) => {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm card-media">
        <img
          src={media.imagen || SIN_IMAGEN}
          className="card-img-top"
          alt={media.titulo}
          onError={(e) => { e.target.src = SIN_IMAGEN; }}
        />
        <div className="card-body">
          <div className="mb-2">
            <span className="badge bg-warning text-dark me-1">{media.tipo?.nombre}</span>
            <span className="badge bg-info text-dark">{media.genero?.nombre}</span>
          </div>
          <h5 className="card-title mb-1">{media.titulo}</h5>
          <p className="text-muted small mb-2">{media.anioEstreno} · Serial {media.serial}</p>
          <p className="card-text mb-1"><strong>Director:</strong> {media.director?.nombres}</p>
          <p className="card-text mb-1"><strong>Productora:</strong> {media.productora?.nombre}</p>
          <a href={media.url} target="_blank" rel="noreferrer" className="card-text small">Ver producción</a>
        </div>
        <div className="card-footer bg-white d-flex justify-content-between">
          <button className="btn btn-sm btn-outline-primary" onClick={onEditar}>Editar</button>
          <button className="btn btn-sm btn-outline-danger" onClick={onEliminar}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};
