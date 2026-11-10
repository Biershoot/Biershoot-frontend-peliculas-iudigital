import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          🎬 Películas IU Digital
        </Link>
        <div className="navbar-nav">
          <NavLink className="nav-link" to="/medias">Películas y series</NavLink>
          <NavLink className="nav-link" to="/generos">Géneros</NavLink>
          <NavLink className="nav-link" to="/directores">Directores</NavLink>
          <NavLink className="nav-link" to="/productoras">Productoras</NavLink>
          <NavLink className="nav-link" to="/tipos">Tipos</NavLink>
        </div>
      </div>
    </nav>
  );
};
