import React, { Component } from 'react'
import axios from 'axios';
import { FormControl } from 'react-bootstrap';

export default class CommentForm extends Component {
    constructor() {
        super();
        this.state = { 
            nickname: '',
            text: '',
            restaurantid: ''
        }
        this.onNicknameChange = this.onNicknameChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    onNicknameChange(e) {
        this.setState({ nickname: e.target.value });
    }

    onTextChange(e) {
        this.setState({ text: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        
        const comment = {
            nickname: this.state.nickname,
            text: this.state.text,
            restaurantid: this.props.restaurant_id._id
        };

        axios.post(`https://7b9gsutr00.execute-api.us-east-1.amazonaws.com/dev/restaurant/addcomment`, comment)
            .then(res => {
            console.log(res.status);
      });
    }

  render() {
    return (
      
      <div>

           <form onSubmit={this.onSubmit.bind(this)}>
           <FormControl
            type="text"
            name="nickname"
            className="search_form"
            value={this.state.value}
            placeholder="Nimimerkki"
            onChange={this.onNicknameChange}
          />
          <FormControl
            type="text"
            name="text"
            className="search_form"
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
          <button type="submit" className="submit_button">Lisää kommentti</button>
            </form>
        
      </div>
    )
  }
}
