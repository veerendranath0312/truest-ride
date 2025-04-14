import { useState, useEffect } from "react";
import { Loader, X } from "lucide-react";

import useRideStore from "../../store/useRideStore";
import { formattedRideDate } from "../../utils/helpers";
import RidesList from "./RidesList";

// Component for initial search instructions
const SearchInstructions = () => (
  <p className="home__description">
    Please enter your departure and destination locations along with your travel date to
    view available rides.
  </p>
);

// Component for loading state
const LoadingState = () => (
  <p className="home__description home__search--load">
    <Loader size={22} className="loader-spin" />
    &nbsp; Searching for rides, please wait...
  </p>
);

// Component for no rides found message
const NoRidesFound = ({ findRideFormData }) => {
  const isSameDay =
    findRideFormData.startDate?.getTime() === findRideFormData.endDate?.getTime();

  return (
    <p className="home__description">
      No rides available from <b>{findRideFormData.from}</b> to{" "}
      <b>{findRideFormData.to}</b>{" "}
      {isSameDay ? (
        <span>
          on <b>{formattedRideDate(findRideFormData.startDate)}</b>
        </span>
      ) : (
        <span>
          between <b>{formattedRideDate(findRideFormData.startDate)}</b> and{" "}
          <b>{formattedRideDate(findRideFormData.endDate)}</b>
        </span>
      )}
      .
    </p>
  );
};

// Component for search results content
const SearchResultsContent = ({ hasSearched, isLoading, rides, findRideFormData }) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (!hasSearched) {
    return <SearchInstructions />;
  }

  if (rides.length === 0) {
    return <NoRidesFound findRideFormData={findRideFormData} />;
  }

  return <RidesList rides={rides} />;
};

function SearchResults({ hasSearched, setHasSearched, findRideFormData }) {
  const { isLoading, rides } = useRideStore();
  const [isResultsVisible, setIsResultsVisible] = useState(false);

  // Handle DOM manipulation in response to isResultsVisible changes
  useEffect(() => {
    // Only add no-scroll on mobile devices
    const isMobile = window.innerWidth <= 900;

    if (isResultsVisible && isMobile) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isResultsVisible]);

  // Show results sheet when search is performed on mobile
  useEffect(() => {
    if (hasSearched) {
      setIsResultsVisible(true);
    }
  }, [hasSearched]);

  const closeResults = () => {
    setIsResultsVisible(false);
    setHasSearched(false);
  };

  return (
    <>
      {/* Desktop View */}
      <div className="ride__search__results desktop-only">
        <h3 className="home__title">Search results</h3>
        <SearchResultsContent
          hasSearched={hasSearched}
          isLoading={isLoading}
          rides={rides}
          findRideFormData={findRideFormData}
        />
      </div>

      {/* Mobile view */}
      <div className={`mobile-results-sheet ${isResultsVisible ? "active" : ""}`}>
        <div className="mobile-results-header">
          <h3 className="home__title">Search results</h3>
          <button className="close-button" onClick={closeResults}>
            <X />
          </button>
        </div>
        <SearchResultsContent
          hasSearched={hasSearched}
          isLoading={isLoading}
          rides={rides}
          findRideFormData={findRideFormData}
        />
      </div>

      {/* Overlay for mobile */}
      {isResultsVisible && (
        <div className="mobile-results-overlay" onClick={closeResults} />
      )}
    </>
  );
}

export default SearchResults;
