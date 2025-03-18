import RidesListItem from "./RidesListItem";

// TODO: Implement infinite scroll if the results are more than 10
// Or implement pagination
function RidesList({ rides, setNotification }) {
  return (
    <div className="ride__search__results__container">
      {rides.map((ride) => (
        <RidesListItem key={ride.id} ride={ride} setNotification={setNotification} />
      ))}
    </div>
  );
}

export default RidesList;
