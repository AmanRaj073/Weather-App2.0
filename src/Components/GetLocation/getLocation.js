import axios from "axios";

export const getLocation = async () => {
  try {
    // Get the user's current position using the Geolocation API
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    
    const response = await axios.get(url);
    const address = response.data.address;

    return address;
  } catch (error) {
    console.error("Error getting location:", error);
    return error
  }
};
