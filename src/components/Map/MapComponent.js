import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import Geocode from 'react-geocode';
import './map.css';
import {mapiApi, geoApi} from '../env/keys';

export class MapComponent extends Component {
    constructor() {
        super();
        this.state = { latitude: "", longitude: "" };
      }

    
    geoLocate() {
        Geocode.setApiKey(geoApi);
        const address = this.props.restaurant_address + ", " + this.props.restaurant_city;
        Geocode.fromAddress(address).then(
            response => {
              this.setState({latitude: response.results[0].geometry.location.lat});
              this.setState({longitude: response.results[0].geometry.location.lng});
            },
            error => {
              console.error(error);
            }
          );
    }

    componentDidMount() {
        this.geoLocate();
    }

    render() {


        const longitude = this.state.longitude;
        const latitude = this.state.latitude;


        return (
            <Map
            containerStyle={{ position: 'static' }}
            google={this.props.google}
            style={{ width: '100%', height: 300, position: 'static' }}
            center={{
              lat: latitude,
              lng: longitude
            }}
            zoom={14}
          >
          <Marker
            position={{lat: latitude, lng: longitude}} />

            </Map>

       
        );
    }

}

export default GoogleApiWrapper({
    apiKey: mapiApi, 
  })(MapComponent)


