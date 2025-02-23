import { useEffect } from "react";
import FormGroup from "../../components/FormGroup";
import Button from "../../components/Button";

function Modal({ onCloseModal }) {
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
          <h3 className="modal__title">Offer a ride</h3>
          <p className="model__description">
            Please enter the departure and destination locations, ride date,
            number of available seats (up to 10), and the car's make and model.
            All fields are required.
          </p>
          <form className="modal__form">
            <FormGroup
              label="From"
              type="text"
              name="from"
              placeholderText="Departure location"
            />
            <FormGroup
              label="To"
              type="text"
              name="to"
              placeholderText="Destination location"
            />
            <div className="modal__form__group">
              <FormGroup
                label="Ride date"
                type="date"
                name="date"
                placeholderText="Select travel date"
              />
              <FormGroup
                label="Number of seats available"
                type="number"
                min="1"
                max="10"
                default="2"
              />
            </div>

            <FormGroup
              label="Car make and model"
              type="text"
              name="car"
              placeholderText="Hyundai, Elantra"
            />
            <Button className="modal__button">Offer a ride</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
