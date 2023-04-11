import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import blueMarker from "./pinblue.png";
import GOOGLE_MAPS_API_KEY from "./keys";

const mapStyles = {
  width: "100%",
  height: "100%",
};

function getAddressFromLatLng(latLngString) {
  // console.log(latLngString);
  if (latLngString == "{}") {
    console.log("empty");
    return;
  }

  const latLng = JSON.parse(latLngString);
  const geocoder = new window.google.maps.Geocoder();
  const latlngObj = new window.google.maps.LatLng(latLng.lat, latLng.lng);

  return new Promise((resolve, reject) => {
    geocoder.geocode({ location: latlngObj }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          resolve(results[0].formatted_address);
        } else {
          reject("No results found");
        }
      } else {
        reject("Geocoder failed due to: " + status);
      }
    });
  });
}

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false, // Hide the InfoWindow by default
      activeMarker: {}, // Shows the active marker upon click
      selectedPlace: {}, // Shows the InfoWindow to the selected place upon click
    };
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props.position,
      activeMarker: marker,
      showingInfoWindow: true,
      address: null,
    });

    getAddressFromLatLng(JSON.stringify(props.position))
      .then((address) => {
        this.setState({ address: address });
        console.log(address);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(props);
    // console.log(marker);
    // console.log(this.state);
    // console.log("here");
  };

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        address: null,
        // activeMarker: null,
      });
    }
  };

  render() {
    let markers = [];
    let pins = this.props.atmLocations;
    for (let i = 0; i < pins.length; i++) {
      let pin = pins[i];
      let position = { lat: pin.lat, lng: pin.lng };
      let icon = {
        scaledSize: new this.props.google.maps.Size(40, 60),
        url: blueMarker,
      };
      if (i == 0) {
        markers.push(
          <Marker
            key={i}
            position={position}
            title={"YOU"}
            icon={icon}
            onClick={this.onMarkerClick}
          />
        );
      } else {
        markers.push(
          <Marker
            key={i}
            position={position}
            title={pin.title}
            onClick={this.onMarkerClick}
          />
        );
      }
    }
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={{ lat: 37.7749, lng: -122.4194 }}
        center={this.props.atmLocations[0]}
      >
        {markers}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h3>{this.state.address}</h3>

            <p>chase bank</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY,
})(MapContainer);
