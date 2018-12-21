import React, { Component } from 'react'
import axios from 'axios';
import './commentform.css';
import { FormControl, Button, Alert, FormGroup } from 'react-bootstrap';
import Rating from 'react-rating';


export default class CommentForm extends Component {
    constructor() {
        super();
        this.state = { 
            nickname: '',
            text: '',
            restaurantid: '',
            initValue: 3,
            showSuccessMessage: false,
            postingComment: false
        }
        
    }

    onNicknameChange = (e) => {
        this.setState({ nickname: e.target.value });
    }

    onTextChange = (e) => {
        this.setState({ text: e.target.value });
    }

    handleClick = (e) => {
        this.setState({initValue: e});
      }

    getComments() {
        this.props.fetchComments(this.props.restaurantid)
    }

    getValidationStateName() {
        const namelength = this.state.nickname.length;
        if (namelength > 0 && namelength < 4) return 'error';
        else if (namelength >= 4) return 'success';
        return null;
      }
    
    getValidationStateText() {
        const textlength = this.state.text.length;
        if(textlength > 0 && textlength < 4) return 'error';
        else if (textlength >= 4) return 'success';
        return null
    }

    onSubmit = e => {
        this.setState({ postingComment: true });
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
                this.setState({ nickname: '', text: '', initValue: 3, showSuccessMessage: true, postingComment: false })
                window.setTimeout(() => {
                    this.setState({
                      showSuccessMessage: false
                    });
                  }, 2000);
            })
      };

   
  render() {

    let SubmitButton;
    let PostSuccess;

    if(this.state.nickname.length < 3 || this.state.text.length < 4) {
        SubmitButton = <Button type="submit" className="restaurant_add_button" disabled>Lisää kommentti</Button>
    } else {
        SubmitButton = <Button type="submit" className="restaurant_add_button">Lisää kommentti</Button>
    }

    if(this.state.showSuccessMessage) {
        PostSuccess = <Alert bsStyle="success"><b>Kommentti lisätty!</b></Alert>
    }

    if(this.state.postingComment) {
        SubmitButton = <Button type="submit" className="restaurant_add_button" disabled>Lisätään kommenttia...</Button>
    }

    return (
        
      
      <div>

          {PostSuccess}

           <form onSubmit={this.onSubmit.bind(this)}>
           <FormGroup controlId="formValidationError4" validationState={this.getValidationStateName()}>
           <FormControl
            type="text"
            name="nickname"
            className="add_restaurant_input"
            value={this.state.nickname}
            placeholder="Nimimerkki"
            onChange={this.onNicknameChange}
          />
          <FormControl.Feedback />
          </FormGroup>

           <FormGroup controlId="formValidationError4" validationState={this.getValidationStateText()}>
          <FormControl
            type="text"
            name="text"
            className="add_restaurant_input"
            value={this.state.text}
            placeholder="Lyhyt arvio"
            onChange={this.onTextChange}
          />
          <FormControl.Feedback />
          </FormGroup>

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
