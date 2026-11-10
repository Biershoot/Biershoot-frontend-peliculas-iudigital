import { Link } from 'react-router-dom';

const modulos = [
  { ruta: '/medias', titulo: 'Películas y series', texto: 'Registrar las producciones con su género, director, productora y tipo.' },
  { ruta: '/generos', titulo: 'Géneros', texto: 'Acción, aventura, ciencia ficción, drama, terror...' },
  { ruta: '/directores', titulo: 'Directores', texto: 'Directores principales de cada producción.' },
  { ruta: '/productoras', titulo: 'Productoras', texto: 'Estudios como Disney, Warner, Paramount o MGM.' },
  { ruta: '/tipos', titulo: 'Tipos', texto: 'Película, serie u otros tipos que se necesiten.' },
];

export const Inicio = () => {
  return (
    <div className="container py-4">
      <div className="p-4 mb-4 bg-white rounded shadow-sm">
        <h1 className="h3">Administrador de películas y series</h1>
        <p className="text-muted mb-0">
          Aplicación web para gestionar el catálogo de películas y series de la IU Digital.
          Seleccione un módulo para empezar.
        </p>
      </div>
      <div className="row g-3">
        {modulos.map((m) => (
          <div className="col-md-4" key={m.ruta}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{m.titulo}</h5>
                <p className="card-text text-muted">{m.texto}</p>
                <Link to={m.ruta} className="btn btn-dark btn-sm">Ir al módulo</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
