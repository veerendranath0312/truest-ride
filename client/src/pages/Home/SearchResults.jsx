import React from "react";
import RidesList from "./RidesList";

function SearchResults() {
  return (
    <div className="ride__search__results">
      <h3 className="home__title">Search results</h3>
      <p>
        Please enter your departure and destination locations along with your
        travel date to view available rides.
      </p>

      <RidesList />
    </div>
  );
}

export default SearchResults;
