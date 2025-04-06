import RidesList from "./RidesList";
import { Loader } from "lucide-react";
import useRideStore from "../../store/useRideStore";
import { capitalize, formattedRideDate } from "../../utils/helpers";
import Notification from "../../components/Notification";

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
      No rides available from <b>{capitalize(findRideFormData.from)}</b> to{" "}
      <b>{capitalize(findRideFormData.to)}</b>{" "}
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
const SearchResultsContent = ({
  hasSearched,
  isLoading,
  rides,
  findRideFormData,
  setNotification,
}) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (!hasSearched) {
    return <SearchInstructions />;
  }

  if (rides.length === 0) {
    return <NoRidesFound findRideFormData={findRideFormData} />;
  }

  return <RidesList rides={rides} setNotification={setNotification} />;
};

function SearchResults({ hasSearched, findRideFormData, notification, setNotification }) {
  const { isLoading, rides } = useRideStore();

  return (
    <div className="ride__search__results">
      <h3 className="home__title">Search results</h3>

      {notification.message ? (
        <Notification type={notification.type} message={notification.message} />
      ) : (
        <SearchResultsContent
          hasSearched={hasSearched}
          isLoading={isLoading}
          rides={rides}
          findRideFormData={findRideFormData}
          setNotification={setNotification}
        />
      )}
    </div>
  );
}

export default SearchResults;
