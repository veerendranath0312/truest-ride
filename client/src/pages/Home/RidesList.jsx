import RidesListItem from "./RidesListItem";

// TODO: Implement infinite scroll if the results are more than 10
// Or implement pagination
function RidesList({ rides }) {
  return (
    <div className="ride__search__results__container">
      {rides.map((ride) => (
        <RidesListItem key={ride.id} ride={ride} />
      ))}
    </div>
  );
}

export default RidesList;
