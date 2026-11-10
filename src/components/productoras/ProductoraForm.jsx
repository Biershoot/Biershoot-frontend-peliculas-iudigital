import { useState } from 'react';
import { crearProductora, actualizarProductora } from '../../services/productoraService';
import { mostrarCargando, mostrarError, mostrarExito } from '../../helpers/mensajes';

export const ProductoraForm = ({ productora, onGuardado, onCancelar }) => {
  const [valores, setValores] = useState({
    nombre: productora?.nombre || '',
    estado: productora?.estado || 'Activo',
    slogan: productora?.slogan || '',
    descripcion: productora?.descripcion || '',
  });

  const { nombre, estado, slogan, descripcion } = valores;

  const handleChange = ({ target }) => {
    setValores({ ...valores, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      mostrarCargando('Guardando...');
      if (productora) {
        await actualizarProductora(productora._id, valores);
        mostrarExito('Productora actualizada correctamente');
      } else {
        await crearProductora(valores);
        mostrarExito('Productora creada correctamente');
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
            onChange={handleChange} placeholder="Ej: Warner Bros" required />
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
        <label className="form-label">Slogan</label>
        <input type="text" name="slogan" className="form-control" value={slogan} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea name="descripcion" className="form-control" rows="3" value={descripcion}
          onChange={handleChange} />
      </div>
      <div className="text-end">
        <button type="button" className="btn btn-secondary me-2" onClick={onCancelar}>Cancelar</button>
        <button type="submit" className="btn btn-primary">{productora ? 'Actualizar' : 'Guardar'}</button>
      </div>
    </form>
  );
};
