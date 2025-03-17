import { useEffect, useState } from "react";

const useLoadGooglePlaces = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setLoaded(true);
    }
  }, []);

  return loaded;
};

export default useLoadGooglePlaces;
