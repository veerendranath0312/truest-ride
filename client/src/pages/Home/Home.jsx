import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";

import PlacesAutocomplete from "../../components/PlacesAutocomplete";
import useAuthStore from "../../store/useAuthStore";
import useRideStore from "../../store/useRideStore";
import { capitalize } from "../../utils/helpers";
import Navbar from "../../components/Navbar";
import FindRide from "./FindRide";
import OfferRide from "./OfferRide";
import SearchResults from "./SearchResults";
import Footer from "../../components/Footer";
import Modal from "./Modal";
import "./home.css";

function Home() {
  const { user } = useAuthStore();
  const { isLoading, offerRide } = useRideStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    rideDate: new Date().toISOString(),
    totalSeats: 1,
    carModel: "",
  });
  const [findRideFormData, setFindRideFormData] = useState({
    from: "",
    to: "",
    startDate: null,
    endDate: null,
  });
  const [formLabelErrors, setFormLabelErrors] = useState({
    fromErrorLabel: "",
    toErrorLabel: "",
    rideDateErrorLabel: "",
    carModelErrorLabel: "",
    totalSeatsErrorLabel: "",
  });
  const [hasSearched, setHasSearched] = useState(false); // Track whether a search has been performed

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLocationChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormLabelErrors((prev) => ({ ...prev, [`${field}ErrorLabel`]: "" }));
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, rideDate: date?.toISOString() });
    setFormLabelErrors({ ...formLabelErrors, rideDateErrorLabel: "" });
  };

  const handleOfferRide = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.from) errors.fromErrorLabel = "From location is required.";
    if (!formData.to) errors.toErrorLabel = "To location is required.";
    if (!formData.rideDate) errors.rideDateErrorLabel = "Ride date is required.";
    if (!formData.totalSeats)
      errors.totalSeatsErrorLabel = "Seats available is required.";
    if (!formData.carModel) errors.carModelErrorLabel = "Car make and model is required.";

    if (Object.keys(errors).length > 0) {
      setFormLabelErrors(errors);
      return;
    }

    // Submit the form
    toast.promise(offerRide(formData), {
      loading: "Offering ride...",
      success: () => {
        // Reset the form data and close the modal after successful creation
        setTimeout(() => {
          setFormData({
            from: "",
            to: "",
            rideDate: new Date().toISOString(),
            totalSeats: 1,
            carModel: "",
          });
          closeModal();
        }, 1000);
        return "Ride offered successfully!";
      },
      error: (err) => err.message,
    });

    // try {
    //   await offerRide(formData);
    //   toast.success("Ride offered successfully!");

    //   // Reset the form data, Notification, and close the modal after 1 second
    //   setTimeout(() => {
    //     setFormData({
    //       from: "",
    //       to: "",
    //       rideDate: new Date().toISOString(),
    //       totalSeats: 1,
    //       carModel: "",
    //     });
    //     closeModal();
    //   }, 1000);
    // } catch (err) {
    //   toast.error(err.message);
    // }
  };

  return (
    <div className="home">
      <Navbar isAuthenticated={true} />
      <div className="container">
        <h2 className="home__welcome">
          Welcome back, {capitalize(user?.full_name?.split(" ")[0] || "")}{" "}
          <span className="waving-hand" role="img" aria-label="waving hand">
            👋
          </span>
        </h2>
        <section className="home__hero">
          <div className="home__options">
            <OfferRide onOpenModal={openModal} />
            <FindRide
              setHasSearched={setHasSearched}
              findRideFormData={findRideFormData}
              setFindRideFormData={setFindRideFormData}
            />
          </div>

          <SearchResults
            hasSearched={hasSearched}
            setHasSearched={setHasSearched}
            findRideFormData={findRideFormData}
          />
        </section>

        <Footer />

        {isModalOpen && (
          <Modal
            onCloseModal={closeModal}
            modalTitle="Offer a ride"
            modalDescription="Please enter the departure and destination locations, ride date, number of available seats (up to 10), and the car's make and model. All fields are required."
          >
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

                <div className="form__group">
                  <label
                    htmlFor="seats"
                    className={`form__label ${
                      formLabelErrors.totalSeatsErrorLabel && "form__label--error"
                    }`}
                  >
                    {formLabelErrors.totalSeatsErrorLabel || "Seats available"}
                  </label>
                  <input
                    type="number"
                    id="seats"
                    name="totalSeats"
                    placeholder="Select seats from 1 to 10"
                    min={1}
                    max={10}
                    className={`form__input ${
                      formLabelErrors.totalSeatsErrorLabel && "form__input--error"
                    }`}
                    value={formData.totalSeats}
                    onChange={(e) => handleLocationChange("totalSeats", e.target.value)}
                  />
                </div>
              </div>

              <div className="form__group">
                <label
                  htmlFor="car"
                  className={`form__label ${
                    formLabelErrors.carModelErrorLabel && "form__label--error"
                  }`}
                >
                  {formLabelErrors.carModelErrorLabel || "Car make and model"}
                </label>
                <input
                  type="text"
                  id="car"
                  name="carModel"
                  placeholder="Hyundai, Elantra"
                  className={`form__input ${
                    formLabelErrors.carModelErrorLabel && "form__input--error"
                  }`}
                  value={formData.carModel}
                  onChange={(e) => handleLocationChange("carModel", e.target.value)}
                />
              </div>
              <button className="btn modal__button" disabled={isLoading}>
                Offer ride
              </button>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Home;
