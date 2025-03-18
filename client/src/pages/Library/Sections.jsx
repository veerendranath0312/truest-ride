import { useSearchParams } from "react-router";

import Content from "./Content";

const Section = ({ title, value }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = () => {
    searchParams.set("section", value);
    setSearchParams(searchParams);
  };

  const isActive = searchParams.get("section") === value;

  return (
    <button
      className={`library__section ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

const Sections = () => {
  return (
    <div className="library__sections">
      <div className="library__sections__tabs">
        <Section title="Bookings" value="bookings" />
        <Section title="Offerings" value="offerings" />
      </div>

      <Content />
    </div>
  );
};

export default Sections;
