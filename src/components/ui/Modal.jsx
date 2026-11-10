// modal sencillo hecho con las clases de bootstrap, se muestra u oculta con el estado del padre
export const Modal = ({ titulo, onCerrar, children }) => {
  return (
    <div className="modal d-block modal-fondo" tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{titulo}</h5>
            <button type="button" className="btn-close" onClick={onCerrar}></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};
