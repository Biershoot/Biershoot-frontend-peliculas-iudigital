import { useState } from 'react';
import { crearDirector, actualizarDirector } from '../../services/directorService';
import { mostrarCargando, mostrarError, mostrarExito } from '../../helpers/mensajes';

export const DirectorForm = ({ director, onGuardado, onCancelar }) => {
  const [valores, setValores] = useState({
    nombres: director?.nombres || '',
    estado: director?.estado || 'Activo',
  });

  const { nombres, estado } = valores;

  const handleChange = ({ target }) => {
    setValores({ ...valores, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      mostrarCargando('Guardando...');
      if (director) {
        await actualizarDirector(director._id, valores);
        mostrarExito('Director actualizado correctamente');
      } else {
        await crearDirector(valores);
        mostrarExito('Director creado correctamente');
      }
      onGuardado();
    } catch (error) {
      mostrarError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-8 mb-3">
          <label className="form-label">Nombres</label>
          <input type="text" name="nombres" className="form-control" value={nombres}
            onChange={handleChange} placeholder="Ej: Christopher Nolan" required />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Estado</label>
          <select name="estado" className="form-select" value={estado} onChange={handleChange} required>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
      </div>
      <div className="text-end">
        <button type="button" className="btn btn-secondary me-2" onClick={onCancelar}>Cancelar</button>
        <button type="submit" className="btn btn-primary">{director ? 'Actualizar' : 'Guardar'}</button>
      </div>
    </form>
  );
};
