import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import blueMarker from "./pinblue.png";
import GOOGLE_MAPS_API_KEY from "../../../../keys";
const mapStyles = {
  width: "100%",
  height: "100%",
};

export class MapContainer extends Component {
  render() {
    // console.log(this.props.atmLocations);
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
          <Marker key={i} position={position} title={"YOU"} icon={icon} />
        );
      } else {
        markers.push(<Marker key={i} position={position} title={pin.title} />);
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
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY,
})(MapContainer);
console.log(process.env.GOOGLE_MAP_KEY);
