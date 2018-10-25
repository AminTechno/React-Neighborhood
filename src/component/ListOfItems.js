import React, { Component } from 'react';

class ListOfItems extends Component {
    render() {
        return(
            <li className="listOfItems" onClick={() => this.props.handleItemClick(this.props)}>
            <img className="icon" src={this.props.categories[0].icon.prefix+"32"+this.props.categories[0].icon.suffix}
            alt={this.props.categories[0].name}/>
            {this.props.name}
            </li>
        );
    }
}

export default ListOfItems;
