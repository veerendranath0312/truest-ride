import RidesList from "./RidesList";
import { Loader } from "lucide-react";
import useRideStore from "../../store/useRideStore";
import { capitalize, formattedRideDate } from "../../utils/helpers";
import Notification from "../../components/Notification";

function SearchResults({ hasSearched, findRideFormData, notification, setNotification }) {
  const { isLoading, rides } = useRideStore();

  return (
    <div className="ride__search__results">
      <h3 className="home__title">Search results</h3>

      {notification.message && (
        <Notification type={notification.type} message={notification.message} />
      )}

      {/* Display home description if no search has been performed */}
      {!isLoading && !hasSearched && (
        <p className="home__description">
          Please enter your departure and destination locations along with your travel
          date to view available rides.
        </p>
      )}

      {/* Display loading message while searching */}
      {isLoading && (
        <p className="home__description home__search--load">
          <Loader size={22} className="loader-spin" />
          &nbsp; Searching for rides, please wait...
        </p>
      )}

      {/* Display message if no rides are available */}
      {!isLoading && hasSearched && rides.length === 0 && (
        <p className="home__description">
          No rides available from <b>{capitalize(findRideFormData.from)}</b> to{" "}
          <b>{capitalize(findRideFormData.to)}</b>{" "}
          {findRideFormData.startDate?.getTime() ===
          findRideFormData.endDate?.getTime() ? (
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
      )}

      {/* Display search results */}
      {!isLoading && hasSearched && rides.length > 0 && (
        <RidesList rides={rides} setNotification={setNotification} />
      )}
    </div>
  );
}

export default SearchResults;
