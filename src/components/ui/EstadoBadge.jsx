export const EstadoBadge = ({ estado }) => {
  return (
    <span className={`badge ${estado === 'Activo' ? 'bg-success' : 'bg-secondary'}`}>
      {estado}
    </span>
  );
};
