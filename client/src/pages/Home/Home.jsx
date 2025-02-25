import { useState } from "react";
import Navbar from "../../components/Navbar";
import FindRide from "./FindRide";
import OfferRide from "./OfferRide";
import SearchResults from "./SearchResults";
import Footer from "../../components/Footer";
import Modal from "./Modal";
import "./home.css";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="home">
      <Navbar isAuthenticated={true} />
      <div className="container">
        <section className="home__hero">
          <div className="home__options">
            <OfferRide onOpenModal={openModal} />
            <FindRide />
          </div>

          <SearchResults />
        </section>

        <Footer />

        {isModalOpen && <Modal onCloseModal={closeModal} />}
      </div>
    </div>
  );
}

export default Home;
