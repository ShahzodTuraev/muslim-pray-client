import axios from "axios";
import { useEffect, useState } from "react";
import { Location } from "../types/locationType";

export default function UseLocation() {
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    // Check if geolocation is available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_LOCATION_API}/json?q=${latitude}+${longitude}&key=${process.env.NEXT_PUBLIC_LOCATION_KEY}`
          );
          const data = response.data;
          const city = data.results[0]?.components.city || "Unknown city";
          const country =
            data.results[0]?.components.country || "Unknown country";
          setLocation({ city, country, latitude, longitude });

          console.log(data);
        },
        (error) => {
          console.error("Error getting location", error);
          console.log("Location not available");
        }
      );
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  return location;
}
