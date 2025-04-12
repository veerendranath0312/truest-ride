import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Loader2 } from "lucide-react";

import useRideStore from "../../store/useRideStore";
import PlacesAutocomplete from "../../components/PlacesAutocomplete";

function FindRide({
  setHasSearched,
  findRideFormData,
  setFindRideFormData,
  setNotification,
}) {
  const { isLoading, searchRides } = useRideStore();
  const [FormLabelErrors, setFormLabelErrors] = useState({
    fromErrorLabel: "",
    toErrorLabel: "",
    dateErrorLabel: "",
  });

  const handleLocationChange = (field, value) => {
    setFindRideFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setFormLabelErrors((prev) => ({
      ...prev,
      [`${field}ErrorLabel`]: "",
    }));
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setFindRideFormData((prev) => ({
      ...prev,
      startDate: start,
      endDate: end,
    }));

    setFormLabelErrors({
      ...FormLabelErrors,
      dateErrorLabel: "",
    });

    setNotification({ message: "", type: "" }); // Clear notification when user starts typing
    setHasSearched(false); // Reset search results when user starts typing
  };

  const handleFindRide = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!findRideFormData.from) {
      errors.fromErrorLabel = "Pickup location is required";
    }

    if (!findRideFormData.to) {
      errors.toErrorLabel = "Drop-off location is required";
    }

    if (!findRideFormData.startDate || !findRideFormData.endDate) {
      errors.dateErrorLabel = "Start date and end date are required";
    }

    if (Object.keys(errors).length > 0) {
      setFormLabelErrors(errors);
      return;
    }

    // Perform search
    try {
      setHasSearched(true);
      setNotification({ message: "", type: "" }); // Clear notification when starting new search

      await searchRides({
        ...findRideFormData,
        from: findRideFormData.from.toLowerCase().trim(),
        to: findRideFormData.to.toLowerCase().trim(),
      });
    } catch (error) {
      setNotification({ message: error.message, type: "error" });
    }
  };

  return (
    <div className="home__find">
      <h3 className="home__title">Find a ride</h3>
      <p>Search for available rides that matches your route.</p>

      <form className="home__find__form" onSubmit={handleFindRide}>
        <PlacesAutocomplete
          id="from"
          name="from"
          label="From"
          value={findRideFormData.from}
          placeholder="Enter pickup location"
          error={FormLabelErrors.fromErrorLabel}
          onChange={(value) => handleLocationChange("from", value)}
          onPlaceSelect={(value) => handleLocationChange("from", value)}
        />

        <PlacesAutocomplete
          id="to"
          name="to"
          label="To"
          value={findRideFormData.to}
          placeholder="Enter drop-off location"
          error={FormLabelErrors.toErrorLabel}
          onChange={(value) => handleLocationChange("to", value)}
          onPlaceSelect={(value) => handleLocationChange("to", value)}
        />

        <div className="form__group">
          <label
            htmlFor="date"
            className={`form__label ${
              FormLabelErrors.dateErrorLabel && "form__label--error"
            }`}
          >
            {FormLabelErrors.dateErrorLabel || "Select date range"}
          </label>
          <DatePicker
            isClearable
            selectsRange
            minDate={new Date()}
            selected={findRideFormData.startDate}
            startDate={findRideFormData.startDate}
            endDate={findRideFormData.endDate}
            onChange={handleDateChange}
            className={`form__input ${
              FormLabelErrors.dateErrorLabel && "form__input--error"
            }`}
            placeholderText="Select range of dates you want to travel"
          />
        </div>
        <button className="btn home__find__button">
          {isLoading ? (
            <>
              <Loader2 size="22" className="loader-spin" />
              &nbsp; Finding rides...
            </>
          ) : (
            "Find rides"
          )}
        </button>
      </form>
    </div>
  );
}

export default FindRide;
