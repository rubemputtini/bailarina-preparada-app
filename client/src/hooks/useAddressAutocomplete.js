import { useEffect, useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import useLoadGooglePlaces from "./useLoadGooglePlaces";

const useAddressAutocomplete = (onAddressFieldsUpdate) => {
  const googleLoaded = useLoadGooglePlaces();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (googleLoaded) setIsReady(true);
  }, [googleLoaded]);

  const { suggestions, setValue, clearSuggestions } = usePlacesAutocomplete({
    debounce: 300,
    requestOptions: {},
    skip: !isReady,
  });

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = getLatLng(results[0]);

      const addressComponents = results[0].address_components;
      const getComponent = (types) =>
        addressComponents.find((c) => types.some((type) => c.types.includes(type)))?.long_name || "";

      const newFields = {
        street: getComponent(["route"]),
        number: getComponent(["street_number"]),
        neighborhood: getComponent(["sublocality"]),
        city: getComponent(["administrative_area_level_2"]),
        state: getComponent(["administrative_area_level_1"]),
        country: getComponent(["country"]),
        postalCode: getComponent(["postal_code"]),
        latitude: lat,
        longitude: lng,
      };

      Object.entries(newFields).forEach(([key, value]) => {
        onAddressFieldsUpdate(key, value);
      });
    } catch (error) {
      console.error("Erro ao buscar dados do endereço:", error);
    }
  };

  return {
    suggestions,
    setValue,
    handleSelect,
    clearSuggestions
  };
};

export default useAddressAutocomplete;