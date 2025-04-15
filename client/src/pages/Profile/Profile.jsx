// Profile.jsx (Apple-Inspired Version)
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "./Profile.css";

const LOCAL_STORAGE_KEY = "student_profile_data";
const LOCAL_STORAGE_IMAGE = "student_profile_image";

const Profile = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const [imageSrc, setImageSrc] = useState("https://via.placeholder.com/130");

  const [profileData, setProfileData] = useState({
    name: user?.name || "Student",
    email: user?.email || "",
    phone: user?.phone || "",
    college: user?.college || "",
    location: user?.location || "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedImage = localStorage.getItem(LOCAL_STORAGE_IMAGE);
    if (savedData) setProfileData(JSON.parse(savedData));
    if (savedImage) setImageSrc(savedImage);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setImageSrc(base64);
        localStorage.setItem(LOCAL_STORAGE_IMAGE, base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profileData));
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <div className="profile-page">
      <Navbar isAuthenticated={true} />
      <div className="profile-container">
        <div className="profile-card">
          <div className="avatar-container">
            <img src={imageSrc} alt="Avatar" className="avatar" />
            {editMode && (
              <label className="upload-btn">
                Upload Photo
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </label>
            )}
          </div>

          {editMode ? (
            <>
              <input
                className="name-input"
                name="name"
                type="text"
                value={profileData.name}
                onChange={handleChange}
              />
              <p className="profile-role">Student Rider</p>
              <div className="profile-info">
                {Object.entries(profileData).slice(1).map(([field, value]) => (
                  <div className="info-item" key={field}>
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input
                      type="text"
                      name={field}
                      value={value}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
              <button className="action-btn" onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <h2 className="view-name">{profileData.name}</h2>
              <p className="profile-role">Student Rider</p>
              <div className="profile-info">
                {Object.entries(profileData).slice(1).map(([field, value]) => (
                  <div className="info-item" key={field}>
                    <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {value}
                  </div>
                ))}
              </div>
              <button className="action-btn" onClick={handleEdit}>Edit</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
