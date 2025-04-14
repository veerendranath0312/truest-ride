import { useEffect } from "react";

function Modal({ onCloseModal, children, modalTitle, modalDescription }) {
  useEffect(() => {
    // Add the no-scroll class to the body when the modal is opened
    document.body.classList.add("no-scroll");

    // Remove the no-scroll class from the body when the modal is closed
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);
  return (
    <div className="modal-overlay" onClick={onCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onCloseModal}>
          <ion-icon name="close-circle-outline"></ion-icon>
        </button>
        <div className="modal__content">
          <h3 className="modal__title">{modalTitle}</h3>
          <p className="model__description">{modalDescription}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
