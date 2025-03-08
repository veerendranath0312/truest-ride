import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormGroup from "../../components/FormGroup";
import Button from "../../components/Button";

function FindRide() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="home__find">
      <h3 className="home__title">Find a ride</h3>
      <p>Search for available rides that matches your route.</p>
      <form className="home__find__form">
        <FormGroup label="From">
          <input
            type="text"
            id="from"
            name="from"
            placeholder="Enter pickup location"
            className="form__input"
          />
        </FormGroup>
        <FormGroup label="To">
          <input
            type="text"
            id="to"
            name="to"
            placeholder="Enter drop-off location"
            className="form__input"
          />
        </FormGroup>
        <FormGroup label="Date">
          <DatePicker
            isClearable
            selectsRange
            minDate={new Date()}
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateChange}
            className="form__input"
            placeholderText="Select range of dates you want to travel"
          />
        </FormGroup>
        <Button className="home__find__button">Find rides</Button>
      </form>
    </div>
  );
}

export default FindRide;
