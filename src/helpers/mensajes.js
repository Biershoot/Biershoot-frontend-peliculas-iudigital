import Swal from 'sweetalert2';

// la API devuelve los errores de dos formas: un texto plano (ej: "Ya existe un género con ese nombre")
// o un objeto { mensaje: [...] } cuando falla express-validator. Aca se sacan los dos casos
export const obtenerMensajeError = (error) => {
  if (!error.response) {
    return 'No hay conexión con la API. Revise que el backend esté corriendo.';
  }

  const data = error.response.data;

  if (typeof data === 'string') {
    return data;
  }

  if (data && Array.isArray(data.mensaje)) {
    const campos = data.mensaje.map((e) => e.path).join(', ');
    return `Revise los campos: ${campos}`;
  }

  return 'Ocurrió un error inesperado';
};

export const mostrarCargando = (texto = 'Cargando...') => {
  Swal.fire({
    title: texto,
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });
};

export const mostrarExito = (texto) => {
  return Swal.fire({
    icon: 'success',
    title: 'Listo',
    text: texto,
    timer: 1800,
    showConfirmButton: false,
  });
};

export const mostrarError = (error) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: obtenerMensajeError(error),
    confirmButtonColor: '#0d6efd',
  });
};

export const confirmarEliminar = async (nombre) => {
  const resultado = await Swal.fire({
    icon: 'warning',
    title: '¿Eliminar registro?',
    text: `Se va a eliminar "${nombre}". Esta acción no se puede deshacer.`,
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#dc3545',
  });
  return resultado.isConfirmed;
};

// formatea las fechas que vienen de mongo
export const formatearFecha = (fecha) => {
  if (!fecha) return '';
  return new Date(fecha).toLocaleString('es-CO', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
};
