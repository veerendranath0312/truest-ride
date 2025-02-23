import React from "react";
import FormGroup from "../../components/FormGroup";
import Button from "../../components/Button";

function FindRide() {
  return (
    <div className="home__find">
      <h3 className="home__title">Find a ride</h3>
      <p>Search for available rides that matches your route.</p>
      <form className="home__find__form">
        <FormGroup
          label="From"
          type="text"
          name="from"
          placeholderText="Enter pickup location"
        />
        <FormGroup
          label="To"
          type="text"
          name="to"
          placeholderText="Enter drop-off location"
        />
        {/* TODO: Use react-datepicker module here */}
        <FormGroup
          label="Date"
          type="date"
          name="date"
          placeholderText="Select travel date"
        />
        <Button className="home__find__button">Find rides</Button>
      </form>
    </div>
  );
}

export default FindRide;
