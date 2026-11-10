import { useEffect, useState } from 'react';
import { listarGenerosActivos } from '../../services/generoService';
import { listarDirectoresActivos } from '../../services/directorService';
import { listarProductorasActivas } from '../../services/productoraService';
import { listarTipos } from '../../services/tipoService';
import { crearMedia, actualizarMedia } from '../../services/mediaService';
import { mostrarCargando, mostrarError, mostrarExito } from '../../helpers/mensajes';

// este formulario se usa tanto para crear (modal) como para editar (pantalla de edicion)
export const MediaForm = ({ media, onGuardado, onCancelar }) => {
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  // cuando la media viene con populate, genero/director/etc son objetos y se necesita solo el _id
  const [valores, setValores] = useState({
    serial: media?.serial || '',
    titulo: media?.titulo || '',
    sinopsis: media?.sinopsis || '',
    url: media?.url || '',
    imagen: media?.imagen || '',
    anioEstreno: media?.anioEstreno || '',
    genero: media?.genero?._id || '',
    director: media?.director?._id || '',
    productora: media?.productora?._id || '',
    tipo: media?.tipo?._id || '',
  });

  const { serial, titulo, sinopsis, url, imagen, anioEstreno, genero, director, productora, tipo } = valores;

  // segun el caso de estudio solo se pueden escoger generos, directores y productoras activos
  const cargarListas = async () => {
    try {
      const [resGeneros, resDirectores, resProductoras, resTipos] = await Promise.all([
        listarGenerosActivos(),
        listarDirectoresActivos(),
        listarProductorasActivas(),
        listarTipos(),
      ]);
      setGeneros(resGeneros.data);
      setDirectores(resDirectores.data);
      setProductoras(resProductoras.data);
      setTipos(resTipos.data);
    } catch (error) {
      mostrarError(error);
    }
  };

  useEffect(() => {
    cargarListas();
  }, []);

  const handleChange = ({ target }) => {
    setValores({ ...valores, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datos = { ...valores, anioEstreno: Number(anioEstreno) };
    try {
      mostrarCargando('Guardando...');
      if (media) {
        await actualizarMedia(media._id, datos);
        // se espera a que termine la alerta porque despues se cambia de pantalla
        await mostrarExito('Producción actualizada correctamente');
      } else {
        await crearMedia(datos);
        mostrarExito('Producción creada correctamente');
      }
      onGuardado();
    } catch (error) {
      mostrarError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Serial</label>
          <input type="text" name="serial" className="form-control" value={serial}
            onChange={handleChange} placeholder="Ej: IUD-001" required />
        </div>
        <div className="col-md-8 mb-3">
          <label className="form-label">Título</label>
          <input type="text" name="titulo" className="form-control" value={titulo}
            onChange={handleChange} required />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Sinopsis</label>
        <textarea name="sinopsis" className="form-control" rows="3" value={sinopsis} onChange={handleChange} />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">URL de la película</label>
          <input type="url" name="url" className="form-control" value={url}
            onChange={handleChange} placeholder="https://..." required />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Imagen (URL de la portada)</label>
          <input type="url" name="imagen" className="form-control" value={imagen}
            onChange={handleChange} placeholder="https://..." />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Año de estreno</label>
          <input type="number" name="anioEstreno" className="form-control" value={anioEstreno}
            onChange={handleChange} min="1888" max="2100" required />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Tipo</label>
          <select name="tipo" className="form-select" value={tipo} onChange={handleChange} required>
            <option value="">--Seleccione--</option>
            {tipos.map((t) => (
              <option key={t._id} value={t._id}>{t.nombre}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Género</label>
          <select name="genero" className="form-select" value={genero} onChange={handleChange} required>
            <option value="">--Seleccione--</option>
            {generos.map((g) => (
              <option key={g._id} value={g._id}>{g.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Director</label>
          <select name="director" className="form-select" value={director} onChange={handleChange} required>
            <option value="">--Seleccione--</option>
            {directores.map((d) => (
              <option key={d._id} value={d._id}>{d.nombres}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Productora</label>
          <select name="productora" className="form-select" value={productora} onChange={handleChange} required>
            <option value="">--Seleccione--</option>
            {productoras.map((p) => (
              <option key={p._id} value={p._id}>{p.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-muted small">
        * En las listas solo aparecen los géneros, directores y productoras que están activos.
      </p>

      <div className="text-end">
        <button type="button" className="btn btn-secondary me-2" onClick={onCancelar}>Cancelar</button>
        <button type="submit" className="btn btn-primary">{media ? 'Actualizar' : 'Guardar'}</button>
      </div>
    </form>
  );
};
