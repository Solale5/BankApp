import React, { useState } from "react";
import Map from "./components/map/Map";
import LocationForm from "./components/locationInput/locationForm";
// function FindAtm() {
//   return (
//     <>
//       <LocationForm />
//       <Map />
//     </>
//   );
// }
// export default FindAtm;
const FindAtm = () => {
  const [atmLocations, setATMLocations] = useState([]);
  const [address, setAddress] = useState("");

  const handleLocationSubmit = (location) => {
    // Use the user's location to get the nearest ATM locations
    // (code for this step not included)
    const locations = [
      // { lat: 37.7751, lng: -122.4184 },
      // { lat: 37.7749, lng: -122.4187 },
      // { lat: 37.7748, lng: -122.4194 },
    ];
    let endpoint = process.env.REACT_APP_BACKEND_URL + "/atms";
    console.log(address);

    let users = async function () {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address }),
        });

        if (!response.ok) {
          throw new Error("atm location failed");
        }

        const data = await response.json();

        // Do something with the response data
        console.log(data);

        for (let i = 0; i < data.length; i++) {
          locations.push(data[i]);
        }

        setATMLocations(locations);
        // console.log("^"); // do something with the locations
        // }
      } catch (error) {
        console.error(error);
        // Handle the error
      }
    };
    users();
  };

  return (
    <div>
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <LocationForm onLocationSubmit={handleLocationSubmit} />
      <Map atmLocations={atmLocations} />
    </div>
  );
};

export default FindAtm;
