import React, { useState } from "react";

const LocationForm = ({ onLocationSubmit }) => {
  const [address, setAddress] = useState("");
  const [useDeviceLocation, setUseDeviceLocation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (useDeviceLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          onLocationSubmit(location);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      // Use the address entered by the user to get the location
      // (code for this step not included)
      const location = {
        lat: 37.7749,
        lng: -122.4194,
      };
      onLocationSubmit(location);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {/* Address: */}
        {/* <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        /> */}
      </label>
      {/* <label>
        Use device location:
        <input
          type="checkbox"
          checked={useDeviceLocation}
          onChange={(e) => setUseDeviceLocation(e.target.checked)}
        />
      </label> */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default LocationForm;
