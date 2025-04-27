import { useState } from "react";
import { toast } from "sonner";
import DatePicker from "react-datepicker";
import useUserStore from "../../store/useUserStore";
import PlacesAutocomplete from "../../components/PlacesAutocomplete";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";

function ProfileForm({ onClose }) {
  const { currentUser, updateUser } = useUserStore();

  const [formData, setFormData] = useState({
    fullname: currentUser.full_name || "",
    email: currentUser.email || "",
    gender: currentUser.gender || "",
    age: currentUser.age || "",
    place: currentUser.place || "",
    university: currentUser.university || "",
    universityStartDate: currentUser.university_start_date
      ? new Date(currentUser.university_start_date)
      : null,
    universityEndDate: currentUser.university_end_date
      ? new Date(currentUser.university_end_date)
      : null,
    imageUrl: currentUser.image_url || "",
  });

  const [formLabelErrors, setFormLabelErrors] = useState({
    fullnameErrorLabel: "",
    genderErrorLabel: "",
    ageErrorLabel: "",
    placeErrorLabel: "",
    universityErrorLabel: "",
    universityStartDateErrorLabel: "",
    universityEndDateErrorLabel: "",
    imageUrlErrorLabel: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormLabelErrors((prev) => ({ ...prev, [`${field}ErrorLabel`]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.fullname?.trim()) errors.fullnameErrorLabel = "Full name is required";
    if (!formData.gender) errors.genderErrorLabel = "Gender is required";

    const age = parseInt(formData.age);
    if (!formData.age) {
      errors.ageErrorLabel = "Age is required";
    } else if (isNaN(age) || age < 18 || age > 100) {
      errors.ageErrorLabel = "Age must be between 18 and 100";
    }

    if (!formData.place.trim()) errors.placeErrorLabel = "Place is required";
    if (!formData.university.trim())
      errors.universityErrorLabel = "University is required";

    // Check if both dates are selected and if start date is before end date
    if (formData.universityStartDate && formData.universityEndDate) {
      if (formData.universityStartDate > formData.universityEndDate) {
        errors.universityStartDateErrorLabel = "Start date must be before end date";
        errors.universityEndDateErrorLabel = "End date must be after start date";
      }
    } else if (formData.universityStartDate && !formData.universityEndDate) {
      errors.universityEndDateErrorLabel = "End date is required";
    } else if (!formData.universityStartDate && formData.universityEndDate) {
      errors.universityStartDateErrorLabel = "Start date is required";
    }

    if (!formData.imageUrl.trim()) errors.imageUrlErrorLabel = "Image URL is required";

    if (Object.keys(errors).length > 0) {
      setFormLabelErrors(errors);
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    try {
      await updateUser(currentUser.id, formData);
      toast.success("Profile updated successfully!");
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modal__form">
      <div className="form__section">
        <div className="modal__form__group">
          <FormInput
            type="text"
            id="fullname"
            name="fullname"
            label="Full name"
            placeholder="Enter your full name"
            value={formData.fullname}
            onChange={(e) => handleInputChange("fullname", e.target.value)}
            error={formLabelErrors.fullnameErrorLabel}
          />

          <FormInput
            type="email"
            id="email"
            name="email"
            label="Email"
            disabled
            value={formData.email}
            className="form__input--disabled"
          />
        </div>
      </div>

      <div className="modal__form__group">
        <FormSelect
          id="gender"
          name="gender"
          label="Gender"
          value={formData.gender}
          onChange={(e) => handleInputChange("gender", e.target.value)}
          error={formLabelErrors.genderErrorLabel}
          options={[
            { value: "", label: "Select your gender" },
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Other", label: "Other" },
          ]}
        />

        <FormInput
          type="number"
          id="age"
          name="age"
          label="Age"
          placeholder="Enter your age"
          value={formData.age}
          onChange={(e) => handleInputChange("age", e.target.value)}
          error={formLabelErrors.ageErrorLabel}
        />
      </div>

      <PlacesAutocomplete
        id="place"
        name="place"
        label="Place"
        value={formData.place}
        placeholder="Select the place you live in"
        error={formLabelErrors.placeErrorLabel}
        onChange={(value) => handleInputChange("place", value)}
        onPlaceSelect={(value) => handleInputChange("place", value)}
      />

      <FormInput
        type="text"
        id="university"
        name="university"
        label="University"
        placeholder="Enter your university"
        value={formData.university}
        onChange={(e) => handleInputChange("university", e.target.value)}
        error={formLabelErrors.universityErrorLabel}
      />

      <div className="modal__form__group">
        <div className="form__group">
          <label
            htmlFor="universityStartDate"
            className={`form__label ${
              formLabelErrors.universityStartDateErrorLabel && "form__label--error"
            }`}
          >
            {formLabelErrors.universityStartDateErrorLabel || "Start Date"}
          </label>
          <DatePicker
            id="universityStartDate"
            name="universityStartDate"
            selected={formData.universityStartDate}
            onChange={(date) => handleInputChange("universityStartDate", date)}
            dateFormat="MM-dd-yyyy"
            isClearable
            placeholderText="Select start date"
            className={`form__input ${
              formLabelErrors.universityStartDateErrorLabel && "form__input--error"
            }`}
            maxDate={formData.universityEndDate || new Date()}
          />
        </div>

        <div className="form__group">
          <label
            htmlFor="universityEndDate"
            className={`form__label ${
              formLabelErrors.universityEndDateErrorLabel && "form__label--error"
            }`}
          >
            {formLabelErrors.universityEndDateErrorLabel || "End Date"}
          </label>
          <DatePicker
            id="universityEndDate"
            name="universityEndDate"
            selected={formData.universityEndDate}
            onChange={(date) => handleInputChange("universityEndDate", date)}
            dateFormat="MM-dd-yyyy"
            isClearable
            placeholderText="Select end date"
            className={`form__input ${
              formLabelErrors.universityEndDateErrorLabel && "form__input--error"
            }`}
            minDate={formData.universityStartDate || new Date()}
          />
        </div>
      </div>

      <div className="modal__form__group">
        <FormInput
          type="url"
          id="imageUrl"
          name="imageUrl"
          label="Profile Image URL"
          placeholder="Enter image URL (optional)"
          value={formData.imageUrl}
          onChange={(e) => handleInputChange("imageUrl", e.target.value)}
          error={formLabelErrors.imageUrlErrorLabel}
        />
        <div className="image-preview">
          <img
            src={formData.imageUrl || currentUser.image_url}
            alt="Profile preview"
            onError={(e) => {
              e.target.src = currentUser.image_url;
              setFormLabelErrors((prev) => ({
                ...prev,
                imageUrlErrorLabel: "Invalid image URL",
              }));
            }}
          />
        </div>
      </div>

      <button type="submit" className="btn modal__button">
        Update Profile
      </button>
    </form>
  );
}

export default ProfileForm;
