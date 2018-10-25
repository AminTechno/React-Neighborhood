/* global google */
import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
 } from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap(props =>(
  <GoogleMap
    defaultZoom={8}
    zoom={props.zoom}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    center={props.center}
    >
    {props.markers &&
      props.markers.filter(marker => marker.isVisible).map((marker, index,arry) => {
      const venueDetails = props.venues.find(venue => venue.id === marker.id);
      return (
         <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => props.markerHadelr(marker)}
          animation={arry.length === 1 ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
          >
          {marker.isOpen &&
            venueDetails.bestPhoto && (
              <InfoWindow>
                <React.Fragment>
                  <img className="venuePhoto" src={`${venueDetails.bestPhoto.prefix}200x200${venueDetails.bestPhoto.suffix}`} alt={`${venueDetails.name}`}/>
                  <p>{venueDetails.name}</p>
                  <p>{venueDetails.location.crossStreet}</p>
                </React.Fragment>
             </InfoWindow>
        )}
        </Marker>
      );
      })}
  </GoogleMap>
))
);

class Map extends Component {
  render() {
    return (
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyClwJXCXS4RorV-qZ5SGr98YKQSyn9QQ94"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`,width:`75%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default Map;
