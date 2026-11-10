import { useState } from 'react';
import { crearGenero, actualizarGenero } from '../../services/generoService';
import { mostrarCargando, mostrarError, mostrarExito } from '../../helpers/mensajes';

export const GeneroForm = ({ genero, onGuardado, onCancelar }) => {
  const [valores, setValores] = useState({
    nombre: genero?.nombre || '',
    estado: genero?.estado || 'Activo',
    descripcion: genero?.descripcion || '',
  });

  const { nombre, estado, descripcion } = valores;

  const handleChange = ({ target }) => {
    setValores({ ...valores, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      mostrarCargando('Guardando...');
      if (genero) {
        await actualizarGenero(genero._id, valores);
        mostrarExito('Género actualizado correctamente');
      } else {
        await crearGenero(valores);
        mostrarExito('Género creado correctamente');
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
          <label className="form-label">Nombre</label>
          <input type="text" name="nombre" className="form-control" value={nombre}
            onChange={handleChange} placeholder="Ej: Ciencia ficción" required />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Estado</label>
          <select name="estado" className="form-select" value={estado} onChange={handleChange} required>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea name="descripcion" className="form-control" rows="3" value={descripcion}
          onChange={handleChange} />
      </div>
      <div className="text-end">
        <button type="button" className="btn btn-secondary me-2" onClick={onCancelar}>Cancelar</button>
        <button type="submit" className="btn btn-primary">{genero ? 'Actualizar' : 'Guardar'}</button>
      </div>
    </form>
  );
};
