import { useEffect } from "react";

function Modal({
  onCloseModal,
  children,
  modalTitle,
  modalDescription,
  size = "medium",
}) {
  useEffect(() => {
    document.body.classList.add("no-scroll"); // Add the no-scroll class to the body when the modal is opened
    return () => document.body.classList.remove("no-scroll"); // Remove the no-scroll class from the body when the modal is closed
  }, []);

  return (
    <div className="modal-overlay" onClick={onCloseModal}>
      <div className={`modal-content modal-${size}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onCloseModal}>
          <ion-icon name="close-circle-outline"></ion-icon>
        </button>
        {(modalTitle || modalDescription) && (
          <div className="modal-header">
            {modalTitle && <h3 className="modal-title">{modalTitle}</h3>}
            {modalDescription && <p className="model-description">{modalDescription}</p>}
          </div>
        )}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
