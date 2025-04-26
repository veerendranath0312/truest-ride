import { useRef, useCallback, useEffect, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Loader2 } from "lucide-react";
import { useGoogleMapsApi } from "../hooks/useGoogleMapsApi";

function PlacesAutocomplete({
  id,
  name,
  label,
  value,
  placeholder,
  error,
  onChange,
  onPlaceSelect,
}) {
  const { isLoaded, loadError } = useGoogleMapsApi();
  const [inputValue, setInputValue] = useState(value);
  const autocompleteRef = useRef(null);
  const isPlaceSelectingRef = useRef(false);

  // Sync internal state with prop value
  useEffect(() => {
    if (!isPlaceSelectingRef.current) {
      setInputValue(value);
    }
  }, [value]);

  const onLoad = useCallback((autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);

  const onUnmount = useCallback(() => {
    autocompleteRef.current = null;
  }, []);

  const handlePlaceChanged = () => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();

    if (!place.formatted_address) {
      // Handle case where place selection was triggered but no valid place was selected
      setInputValue(value);
      return;
    }

    isPlaceSelectingRef.current = true;
    setInputValue(place.formatted_address);
    onPlaceSelect(place.formatted_address);

    // Reset the flag after state updates
    setTimeout(() => {
      isPlaceSelectingRef.current = false;
    }, 0);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (!isPlaceSelectingRef.current) {
      onChange(newValue);
    }
  };

  if (!isLoaded) {
    return (
      <div className="form__group">
        <label htmlFor={id} className="form__label">
          {label}
        </label>
        <div className="form__input form__input--loading">
          <Loader2 size={18} className="loader-spin" />
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="form__group">
        <label htmlFor={id} className="form__label">
          {label}
        </label>
        <input
          type="text"
          id={id}
          name={name}
          placeholder={placeholder}
          className="form__input"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    );
  }

  return (
    <div className="form__group">
      <label htmlFor={id} className={`form__label ${error && "form__label--error"}`}>
        {error || label}
      </label>
      <div className="places-autocomplete">
        <Autocomplete
          onLoad={onLoad}
          onUnmount={onUnmount}
          onPlaceChanged={handlePlaceChanged}
          options={{
            types: ["(cities)"],
            fields: ["formatted_address", "geometry", "name"],
          }}
        >
          <input
            type="text"
            id={id}
            name={name}
            placeholder={placeholder}
            className={`form__input ${error && "form__input--error"}`}
            value={inputValue}
            onChange={handleInputChange}
            autoComplete="off"
          />
        </Autocomplete>
      </div>
    </div>
  );
}

export default PlacesAutocomplete;
