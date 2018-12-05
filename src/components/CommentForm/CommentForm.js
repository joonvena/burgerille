import React, { Component } from 'react'
import axios from 'axios';
import './commentform.css';
import { FormControl } from 'react-bootstrap';
import Rating from 'react-rating';

export default class CommentForm extends Component {
    constructor() {
        super();
        this.state = { 
            nickname: '',
            text: '',
            restaurantid: '',
            initValue: 0
        }
        this.onNicknameChange = this.onNicknameChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    onNicknameChange = e => {
        this.setState({ nickname: e.target.value });
    }

    onTextChange = e => {
        this.setState({ text: e.target.value });
    }

    handleClick = e => {
        console.log(e)
        this.setState({initValue: e});
      }


    onSubmit = e => {
        e.preventDefault();
        
        const comment = {
            nickname: this.state.nickname,
            text: this.state.text,
            restaurantid: this.props.restaurant_id._id
        };

        axios
            .post(`https://7b9gsutr00.execute-api.us-east-1.amazonaws.com/dev/restaurant/addcomment`, comment)
            .then(res => console.log(res.data))
            .catch(error => console.log(error))
      };

   
  render() {
    return (
      
      <div>

           <form onSubmit={this.onSubmit.bind(this)}>
           <FormControl
            type="text"
            name="nickname"
            className="add_restaurant_input"
            value={this.state.value}
            placeholder="Nimimerkki"
            onChange={this.onNicknameChange}
          />
          <FormControl
            type="text"
            name="text"
            className="add_restaurant_input"
            value={this.state.value}
            placeholder="Lyhyt arvio"
            onChange={this.onTextChange}
          />
          <FormControl
            type="hidden"
            name="restaurantid"
            className="search_form"
            value={this.props.restaurant_id._id}
            placeholder="id"
            onChange={this.onIdChange}
           readOnly/>
           <Rating {...this.props} initialRating={this.state.value} onClick={this.handleClick.bind(this)} style={{ 'color': '#ffd942', 'marginBottom': '15px' }} emptySymbol="fa fa-star-o fa-3x"
                                        fullSymbol="fa fa-star fa-3x" />
          <button type="submit" className="restaurant_add_button">Lisää kommentti</button>
            </form>
        
      </div>
    )
  }
}
