import Button from "../../components/Button";

function OfferRide({ onOpenModal }) {
  return (
    <>
      <div className="home__offer">
        <h3 className="home__title">Offer a ride</h3>
        <p>Share your journey, help others reach their destination, and make new friends.</p>
        <div className="home__offer__button__container">
          <Button className="home__offer__button" onClick={onOpenModal}>
            Offer a ride
          </Button>
        </div>
      </div>
    </>
  );
}

export default OfferRide;
