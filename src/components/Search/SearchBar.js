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
        restaurants: [],
        isLoading: true,
        noResults: false,
        serverError: false
    }

    fetchAllRestaurants() {
        axios.get('https://7b9gsutr00.execute-api.us-east-1.amazonaws.com/dev/restaurant/getallrestaurants')
            .then(response => {
                const restaurants = response.data;
                this.setState({ restaurants, isLoading: false })
            }).catch( error => {
                this.setState({ isLoading: false, serverError: true })
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
                this.setState({ noResults: false })
                let restaurant = this.state.restaurants[i];
                restaurants.push(restaurant);
            }
            else if (this.state.restaurantSelect === this.state.restaurants[i].city) {
                this.setState({ noResults: false })
                let restaurant = this.state.restaurants[i];
                restaurants.push(restaurant);
            }
            else {
                this.setState({ noResults: true })
            }
        }
        this.setState(() => ({
            foundRestaurants: restaurants,
        }), () => (this.setState({ restaurantWasFound: true }))
        )
     
    }

    compare(a, b) {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        let comparison = 0;
        if (nameA > nameB) {
            comparison = 1;
        } else if (nameA < nameB) {
            comparison = -1;
        }
        return comparison;
    }

    render() {
        if(this.state.isLoading) {
            return <div className="loading"><img className="searchImg" src="/images/loader.gif" alt="Loading bar" /></div>
        }

        if(this.state.serverError) {
            return <div><h3>Palvelimeen ei saatu yhteyttä</h3></div>
        }

        const noResults = this.state.noResults;
        return (
            <div>

                <img className="burgerKing" src="/images/burger_review.png" alt="burger header"/>
                <h1>BurgerLoversFinland</h1>
                <form>
                    <FormControl type="text" className="search_bar" placeholder="Hae ravintolaa" onInput={(event) => this.handleInput(event.target.value)} />
                    <br />
                    <Button type="submit" className="btn restaurant_search_button" onClick={this.searchRestaurant}>Haku</Button>
                </form>
                <Row className="show-grid" className="search_results" style={{ 'marginTop': '20px' }}>
                {noResults === true && <div><h3>Ei hakutuloksia</h3></div>} 
                    {this.state.foundRestaurants.sort(this.compare).map(restaurant => {
                        return (
                            <div key={restaurant._id}>
                                <RestaurantCard  restaurant_found={true} restaurant={restaurant} />
                            </div>
                        )
                    })}
                </Row>

            </div>
        )
    }
}
