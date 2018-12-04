import React, { Component } from 'react'

export default class RestaurantInfo extends Component {
  render() {
    return (
      <div>

          <h4>{this.props.restaurant.name}</h4>
        
      </div>
    )
  }
}
