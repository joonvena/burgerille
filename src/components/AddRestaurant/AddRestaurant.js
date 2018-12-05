import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './addrestaurant.css';

export default class AddRestaurant extends Component {
    constructor() {
        super();
        this.state = { 
            name: '',
            address: '',
            city: '',
            phone: '',
            successMessage: false
        }
        this.onRestaurantNameChange = this.onRestaurantNameChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
    }

    onRestaurantNameChange = e => {
        this.setState({ name: e.target.value });
    }

    onAddressChange = e => {
        this.setState({ address: e.target.value });
    }

    onCityChange = e => {
        this.setState({ city: e.target.value });
    }

    onPhoneChange = e => {
        this.setState({ phone: e.target.value });
    }

    onSubmit =  () => {
        this.props.history.push('/')
    }


  render() {
    return (
      <div>

      <form onSubmit={this.onSubmit.bind(this)}>
           <FormControl
            type="text"
            name="name"
            className="add_restaurant_input"
            value={this.state.value}
            placeholder="Ravintolan nimi"
            onChange={this.onRestaurantNameChange}
          />
          <FormControl
            type="text"
            name="address"
            className="add_restaurant_input"
            value={this.state.value}
            placeholder="Osoite"
            onChange={this.onAddressChange}
          />
          <FormControl
            type="text"
            name="city"
            className="add_restaurant_input"
            value={this.state.value}
            placeholder="Kaupunki"
            onChange={this.onCityChange}
          />
          <FormControl
            type="text"
            name="phone"
            className="add_restaurant_input"
            value={this.state.value}
            placeholder="Kaupunki"
            onChange={this.onPhoneChange}
          />
          <button type="submit" className="restaurant_add_button">Lähetä</button>
      </form>
        
      </div>
    )
  }
}

withRouter(AddRestaurant);
