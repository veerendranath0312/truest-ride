import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PlacesAutocomplete from "../../components/PlacesAutocomplete";
import FormInput from "../../components/FormInput";

function OfferRideForm({
  formData,
  formLabelErrors,
  isLoading,
  handleLocationChange,
  handleDateChange,
  handleOfferRide,
}) {
  return (
    <form className="modal__form" onSubmit={handleOfferRide}>
      <PlacesAutocomplete
        id="from"
        name="from"
        label="From"
        value={formData.from}
        placeholder="Departure location"
        error={formLabelErrors.fromErrorLabel}
        onChange={(value) => handleLocationChange("from", value)}
        onPlaceSelect={(value) => handleLocationChange("from", value)}
      />

      <PlacesAutocomplete
        id="to"
        name="to"
        label="To"
        value={formData.to}
        placeholder="Destination location"
        error={formLabelErrors.toErrorLabel}
        onChange={(value) => handleLocationChange("to", value)}
        onPlaceSelect={(value) => handleLocationChange("to", value)}
      />

      <div className="modal__form__group">
        <div className="form__group">
          <label
            htmlFor="rideDate"
            className={`form__label ${
              formLabelErrors.rideDateErrorLabel && "form__label--error"
            }`}
          >
            {formLabelErrors.rideDateErrorLabel || "Ride date"}
          </label>
          <DatePicker
            name="rideDate"
            isClearable
            minDate={new Date()}
            selected={formData.rideDate}
            onChange={handleDateChange}
            dateFormat="MM-dd-yyyy"
            placeholderText="Select the date of your ride"
            className={`form__input ${
              formLabelErrors.rideDateErrorLabel && "form__input--error"
            }`}
          />
        </div>

        <FormInput
          type="number"
          id="seats"
          name="totalSeats"
          label="Seats available"
          placeholder="Select seats from 1 to 10"
          min={1}
          max={10}
          value={formData.totalSeats}
          onChange={(e) => handleLocationChange("totalSeats", e.target.value)}
          error={formLabelErrors.totalSeatsErrorLabel}
        />
      </div>

      <FormInput
        type="text"
        id="car"
        name="carModel"
        label="Car make and model"
        placeholder="Hyundai, Elantra"
        value={formData.carModel}
        onChange={(e) => handleLocationChange("carModel", e.target.value)}
        error={formLabelErrors.carModelErrorLabel}
      />
      <button className="btn modal__button" disabled={isLoading}>
        Offer ride
      </button>
    </form>
  );
}

export default OfferRideForm;
