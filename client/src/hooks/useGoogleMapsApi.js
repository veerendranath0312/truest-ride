import { useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"];

export function useGoogleMapsApi() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  return {
    isLoaded,
    loadError: loadError ? new Error("Failed to load Google Maps") : null,
  };
}
