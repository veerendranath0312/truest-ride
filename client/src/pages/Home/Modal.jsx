import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import FormGroup from "../../components/FormGroup";
import Button from "../../components/Button";

function Modal({ onCloseModal }) {
  const [date, setDate] = useState();

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
            <FormGroup label="From">
              <input
                type="text"
                id="from"
                name="from"
                placeholder="Departure location"
                className="form__input"
              />
            </FormGroup>
            <FormGroup label="To">
              <input
                type="text"
                id="to"
                name="to"
                placeholder="Destination location"
                className="form__input"
              />
            </FormGroup>
            <div className="modal__form__group">
              <FormGroup label="Ride date">
                <DatePicker
                  isClearable
                  minDate={new Date()}
                  selected={date}
                  onChange={(date) => setDate(date)}
                  placeholderText="Select the date of your ride"
                  className="form__input"
                />
              </FormGroup>

              <FormGroup label="Number of seats available">
                <input
                  type="number"
                  id="seats"
                  name="seats"
                  placeholder="Destination location"
                  min={1}
                  max={10}
                  className="form__input"
                />
              </FormGroup>
            </div>

            <FormGroup label="Car make and model">
              <input
                type="text"
                id="car"
                name="car"
                placeholder="Hyundai, Elantra"
                className="form__input"
              />
            </FormGroup>
            <Button className="modal__button">Offer a ride</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
