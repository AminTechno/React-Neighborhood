import React, { Component } from 'react';
import ListOfVenues from './ListOfVenues';

class SideBar extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            venues: []
        };
    }
    handleSearch = () => {
        if (this.state.query.trim() !== '') {
            const venues = this.props.venues.filter(venue => venue.name
                .toLowerCase().includes(this.state.query.toLowerCase()));
                return venues;
        }
        return this.props.venues;
    };
    handleInputChanges = event => {
        this.setState({ query: event.target.value });
        const markers = this.props.venues.map(venue => {
            const isMatched = venue.name.toLowerCase().includes(event.target.value.toLowerCase());
            const marker = this.props.markers.find(marker => marker.id === venue.id);
            if (isMatched) {
                marker.isVisible = true;
            } else {
                marker.isVisible = false;
            }
            return marker;
        });
        this.props.updateSuperState({ markers });
    };

    render() {
        return(
            <div className="sideBar" role="complementary">
                <div className="header" role="heading" aria-level="1"><h2>Newark Malls</h2></div>
                <input type="search" aria-label="search" id="search" placeholder="Filter Malls" onChange={this.handleInputChanges}/>
                <ListOfVenues
                {...this.props}
                venues = {this.handleSearch()}
                handleItemClick={this.props.handleItemClick}
                />
            </div>
        );
    }
}

export default SideBar;
