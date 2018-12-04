import React, { Component } from 'react';
import axios from 'axios';
import './search.css';
import { FormControl, Button, Row } from 'react-bootstrap';
import RestaurantCard from '../RestaurantCard/RestaurantInfo';

export default class SearchBar extends Component {
    state = {
        restaurantSelect: '',
        restaurantWasFound: false,
        restaurant: null,
        foundRestaurants: [],
        restaurants: []
    }

    fetchAllRestaurants() {
        axios.get('https://7b9gsutr00.execute-api.us-east-1.amazonaws.com/dev/restaurant/getallrestaurants')
            .then(response => {
                const restaurants = response.data;
                this.setState({ restaurants })
            })
    }

    componentDidMount() {
        this.fetchAllRestaurants();
    }

    handleInput = (value) => {
        this.setState(() => ({
            restaurantSelect: value
        }))
    }

    searchRestaurant = (event) => {
        event.preventDefault()
        let restaurants = [];
        for (var i = 0; i < this.state.restaurants.length; i++) {
            if (this.state.restaurantSelect === this.state.restaurants[i].name) {
                let restaurant = this.state.restaurants[i];
                restaurants.push(restaurant);
            }
            else if (this.state.restaurantSelect === this.state.restaurants[i].city) {
                let restaurant = this.state.restaurants[i];
                restaurants.push(restaurant);

            }
        }

        this.setState(() => ({
            foundRestaurants: restaurants
        }), () => (this.setState({ restaurantWasFound: true }))
        )
    }


    render() {
        return (
            <div>

                <img src="/images/burger_review.png" alt="burger header" className="header_logo" />
                <form>
                    <FormControl type="text" className="search_bar" placeholder="Hae ravintolaa" onInput={(event) => this.handleInput(event.target.value)} />
                    <br />
                    <Button type="submit" className="btn restaurant_search_button" onClick={this.searchRestaurant}>Haku</Button>
                </form>
                <Row className="show-grid" className="search_results" style={{ 'marginTop': '20px' }}>
                    {this.state.foundRestaurants.map(restaurant => {
                        return (
                            <div key={restaurant._id}>
                                <RestaurantCard restaurant_found={true} restaurant={restaurant} />
                            </div>
                        )
                    })}
                </Row>

            </div>
        )
    }
}
