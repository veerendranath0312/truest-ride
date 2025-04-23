import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";

import useAuthStore from "../../store/useAuthStore";
import useRideStore from "../../store/useRideStore";
import { capitalize } from "../../utils/helpers";
import Navbar from "../../components/Navbar";
import FindRide from "./FindRide";
import OfferRide from "./OfferRide";
import SearchResults from "./SearchResults";
import OfferRideForm from "./OfferRideForm";
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
        setFormData({
          from: "",
          to: "",
          rideDate: new Date().toISOString(),
          totalSeats: 1,
          carModel: "",
        });
        closeModal();
        return "Ride offered successfully!";
      },
      error: (err) => err.message,
    });
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
            <OfferRideForm
              formData={formData}
              formLabelErrors={formLabelErrors}
              isLoading={isLoading}
              handleLocationChange={handleLocationChange}
              handleDateChange={handleDateChange}
              handleOfferRide={handleOfferRide}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Home;
