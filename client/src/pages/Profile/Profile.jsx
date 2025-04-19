import { useEffect, useState } from "react";
import { toast } from "sonner";
import { User, MapPin, School, Calendar, Loader2 } from "lucide-react";

import useAuthStore from "../../store/useAuthStore";
import useRideStore from "../../store/useRideStore";
import useUserStore from "../../store/useUserStore";
import Navbar from "../../components/Navbar";
import SettingsModal from "./SettingsModal";
import Footer from "../../components/Footer";
import { formattedRideDate, capitalize } from "../../utils/helpers";
import "./profile.css";

function Profile() {
  const { user } = useAuthStore();
  const { currentUser, fetchUser, updateUser, isLoading } = useUserStore();
  const { offeredRides, bookedRides, fetchOfferedRides, fetchBookedRides } =
    useRideStore();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const loadProfileData = async () => {
      setIsDataLoading(true);
      try {
        // Fetch user profile and rides data in parallel
        await Promise.all([fetchUser(user.id), fetchOfferedRides(), fetchBookedRides()]);
      } catch (err) {
        toast.error(err.message || "Failed to load profile data.");
      } finally {
        setIsDataLoading(false);
      }
    };

    loadProfileData();
  }, [fetchUser, user, fetchOfferedRides, fetchBookedRides]);

  const handleUpdateUser = async (userData) => {
    try {
      // Implement the update user logic here using your user store
      await updateUser(userData);
      await fetchUser(user.id); // Refresh the user data
    } catch (error) {
      throw new Error(error.message || "Failed to update profile");
    }
  };

  if (isDataLoading || isLoading) {
    return (
      <div className="profile">
        <Navbar isAuthenticated={true} />
        <div className="container">
          <div className="loading-state">
            <Loader2 className="animate-spin" size={24} />
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="profile">
        <Navbar isAuthenticated={true} />
        <div className="container">
          <div className="error-state">
            <p>Could not load profile data. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="profile">
        <Navbar isAuthenticated={true} />
        <div className="container">
          <div className="profile__hero">
            <div className="profile__header">
              <img
                className="profile__image"
                src="https://www.shutterstock.com/image-vector/july-3-2023-vector-illustration-600nw-2326749515.jpg"
                alt={`${currentUser.full_name}'s profile`}
              />
              <div className="profile__header__group">
                <h1 className="profile__name">{capitalize(currentUser.full_name)}</h1>
                <p className="profile__email">{currentUser.email}</p>
              </div>
              <button className="profile__button" onClick={() => setIsSettingsOpen(true)}>
                Settings
              </button>
            </div>

            <hr />
            <div className="profile__total__rides">
              <div className="profile__total__rides__item">
                <p>Currently offering</p>
                <h2>{offeredRides?.length || 0} rides</h2>
              </div>
              <div className="profile__total__rides__item">
                <p>Currently booked</p>
                <h2>{bookedRides?.length || 0} rides</h2>
              </div>
            </div>

            <hr />

            <div className="profile__bio">
              <div className="profile__content__group">
                <div className="profile__content__header">
                  <User size={14} />
                  <p>Gender</p>
                </div>
                <h2>{currentUser.gender || "Not specified"}</h2>
              </div>
              <div className="profile__content__group">
                <div className="profile__content__header">
                  <User size={14} />
                  <p>Age</p>
                </div>
                <h2>{currentUser.age ? `${currentUser.age} years` : "Not specified"}</h2>
              </div>
              <div className="profile__content__group">
                <div className="profile__content__header">
                  <MapPin size={14} />
                  <p>Place</p>
                </div>
                <h2 className="profile__place">{currentUser.place || "Not specified"}</h2>
              </div>
              <div className="profile__content__group">
                <div className="profile__content__header">
                  <School size={14} />
                  <p>University</p>
                </div>
                <h2>{currentUser.university || "Not specified"}</h2>
              </div>
              <div className="profile__content__group">
                <div className="profile__content__header">
                  <Calendar size={14} />
                  <p>University Start Date</p>
                </div>
                <h2>
                  {currentUser.university_start_date
                    ? formattedRideDate(currentUser.university_start_date)
                    : "Not specified"}
                </h2>
              </div>
              <div className="profile__content__group">
                <div className="profile__content__header">
                  <Calendar size={14} />
                  <p>University End Date</p>
                </div>
                <h2>
                  {currentUser.university_end_date
                    ? formattedRideDate(currentUser.university_end_date)
                    : "Not specified"}
                </h2>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>

      {isSettingsOpen && (
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen((prev) => !prev)}
          currentUser={currentUser}
          onUpdateUser={handleUpdateUser}
        />
      )}
    </>
  );
}

export default Profile;
