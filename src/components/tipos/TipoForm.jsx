import { useState } from 'react';
import { crearTipo, actualizarTipo } from '../../services/tipoService';
import { mostrarCargando, mostrarError, mostrarExito } from '../../helpers/mensajes';

export const TipoForm = ({ tipo, onGuardado, onCancelar }) => {
  const [valores, setValores] = useState({
    nombre: tipo?.nombre || '',
    descripcion: tipo?.descripcion || '',
  });

  const { nombre, descripcion } = valores;

  const handleChange = ({ target }) => {
    setValores({ ...valores, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      mostrarCargando('Guardando...');
      if (tipo) {
        await actualizarTipo(tipo._id, valores);
        mostrarExito('Tipo actualizado correctamente');
      } else {
        await crearTipo(valores);
        mostrarExito('Tipo creado correctamente');
      }
      onGuardado();
    } catch (error) {
      mostrarError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input type="text" name="nombre" className="form-control" value={nombre}
          onChange={handleChange} placeholder="Ej: Película" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea name="descripcion" className="form-control" rows="3" value={descripcion}
          onChange={handleChange} />
      </div>
      <div className="text-end">
        <button type="button" className="btn btn-secondary me-2" onClick={onCancelar}>Cancelar</button>
        <button type="submit" className="btn btn-primary">{tipo ? 'Actualizar' : 'Guardar'}</button>
      </div>
    </form>
  );
};
