import React, { Component } from 'react'
import axios from 'axios';
import './commentform.css';
import { FormControl, Button, Alert } from 'react-bootstrap';
import Rating from 'react-rating';

export default class CommentForm extends Component {
    constructor() {
        super();
        this.state = { 
            nickname: '',
            text: '',
            restaurantid: '',
            initValue: 3
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
        this.setState({initValue: e});
      }

    getComments() {
        this.props.fetchComments(this.props.restaurantid)
    }

    onSubmit = e => {
        e.preventDefault();
        
        const comment = {
            nickname: this.state.nickname,
            text: this.state.text,
            restaurantid: this.props.restaurant_id._id,
            grade: this.state.initValue
        };

        axios
            .post(`https://7b9gsutr00.execute-api.us-east-1.amazonaws.com/dev/restaurant/addcomment`, comment)
            .then(res =>  {
                console.log(res)
            }).catch(error =>  {
                this.getComments();
                this.setState({ nickname: '', text: '', initValue: 3 })
            })
      };

   
  render() {

    let SubmitButton;
    let Nickvalidate;
    let MessageValidate;

    if(this.state.nickname.length < 3) {
        SubmitButton = <Button type="submit" className="restaurant_add_button" disabled>Lisää kommentti</Button>
    } else {
        SubmitButton = <Button type="submit" className="restaurant_add_button">Lisää kommentti</Button>
    }

    if(this.state.nickname.length > 0 && this.state.nickname.length < 4) {
        Nickvalidate = <Alert bsStyle="danger"><b>Nimimerkin pituus vähintään 4 merkkiä</b></Alert>
    }

    if(this.state.text.length > 0 && this.state.text.length < 5) {
        MessageValidate =  <Alert bsStyle="danger"><b>Viestin pituus vähintään 5 merkkiä</b></Alert>
    }

    return (
      
      <div>

           <form onSubmit={this.onSubmit.bind(this)}>
           <FormControl
            type="text"
            name="nickname"
            className="add_restaurant_input"
            value={this.state.nickname}
            placeholder="Nimimerkki"
            onChange={this.onNicknameChange}
          />
          {Nickvalidate}
          <FormControl
            type="text"
            name="text"
            className="add_restaurant_input"
            value={this.state.text}
            placeholder="Lyhyt arvio"
            onChange={this.onTextChange}
          />
          {MessageValidate}
          <FormControl
            type="hidden"
            name="restaurantid"
            className="search_form"
            value={this.props.restaurant_id._id}
            placeholder="id"
            onChange={this.onIdChange}
           readOnly/>
           <Rating {...this.props} initialRating={this.state.initValue} onClick={this.handleClick.bind(this)} style={{ 'color': '#ffd942', 'marginBottom': '15px' }} emptySymbol="fa fa-star-o fa-3x"
                                        fullSymbol="fa fa-star fa-3x" />
            {SubmitButton}
            </form>
        
      </div>
    )
  }
}
