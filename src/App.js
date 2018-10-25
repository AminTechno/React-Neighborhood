import React, { Component } from 'react';
import './App.css';
import Map from './component/Map';
import SideBar from './component/SideBar';
import SquareAPI from "./API/";

class App extends Component {

  constructor() {
  super();
  this.state = {
    venues: [],
    markers: [],
    center: [],
    zoom: 12,
    updateSuperState: object => {
        this.setState(object);}
 }
}
/* Function to close opened marker*/
 closeOpenedMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    })
    this.setState({ markers: Object.assign(this.state.markers, markers )});
  };

 /* Function to handle when a marker is clicked*/
 markerHadelr = marker => {
   this.closeOpenedMarkers();
   marker.isOpen = true;
   this.setState({ markers: Object.assign(this.state.markers, marker) });
   const venue = this.state.venues.find(venue => venue.id === marker.id);

   SquareAPI.getVenueDetails(marker.id).then(resp => {
     const newVenueLocation = Object.assign(venue, resp.response.venue);
     this.setState({ venues: Object.assign(this.state.venues, newVenueLocation) });
     console.log (newVenueLocation);
   });
 };

 handleItemClick = venue => {
  const marker = this.state.markers.find(marker => marker.id === venue.id);
  this.markerHadelr(marker);
};
  componentDidMount() {
    SquareAPI.search({
      near: "Newark,DE",
      query: "Mall",
      limit: 10
    }).then(results => {
      const { venues } = results.response;
      const { center} = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpenInfo: false,
          isVisible: true,
          id: venue.id
        };
      });
      this.setState({ venues, center, markers });
      console.log(results);
    })
	.catch (error => {
      console.log(error);
      alert('Error with loading this page...');
    })
  }
  render() {
    return (
      <div className="App">
        <SideBar
        {...this.state}
        handleItemClick={this.handleItemClick}
        />
        <Map {...this.state} markerHadelr={this.markerHadelr} />
      </div>
    );
  }
}

export default App;
