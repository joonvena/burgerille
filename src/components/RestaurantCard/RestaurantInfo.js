import React, { Component } from 'react';
import {Modal, Button, Panel } from 'react-bootstrap';
import CommentForm from '../CommentForm/CommentForm';
import Map from '../Map/MapComponent';
import axios from 'axios';

export default class RestaurantInfo extends Component {

  state = {
    comments: [],
    commentsAreFound: false,
    showRestaurantModal: false,
    showCommentModal: false
  }

  openModal = () => {
    if(this.state.commentsAreFound) {
      this.setState({showRestaurantModal:true})
    }
  }

  handleClose = () => {
    this.setState({showRestaurantModal: false})
  }

  openCommentModal = () => {
    this.setState({showCommentModal: true})
  }

  handleCommentClose = () => {
    this.setState({showCommentModal: false})
  }

  componentDidMount() {
      let id = (this.props.restaurant._id)
      let url = 'https://7b9gsutr00.execute-api.us-east-1.amazonaws.com/dev/restaurants/' +id;
      axios.get(url)
          .then(response => {
            this.setState({comments: response.data[0].comments, commentsAreFound: true})

  })}

  render() {

      let comments;
      comments = this.state.comments.map((comment) => {
          return(
              <div>
                  <p><b>{comment.nickname}</b></p>
                  <p>{comment.text}</p>
              </div>
          )
      })


    return (
      <div>
          <Panel>
            <Panel.Heading>
            <Panel.Title componentClass="h3" onClick={this.openModal} style={{ 'cursor': 'pointer' }}>{this.props.restaurant.name}, {this.props.restaurant.address}, {this.props.restaurant.city}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
            
            <Map restaurant_address={this.props.restaurant.address} restaurant_city={this.props.restaurant.city}/>
            
            </Panel.Body>
          </Panel>




          <Modal show={this.state.showRestaurantModal} onHide={this.handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>{this.props.restaurant.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <h4>{this.props.restaurant.address}</h4>
                  <Button onClick={this.openCommentModal}>Kommentit</Button>
              </Modal.Body>
              <Modal.Footer>
                  <Button onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
          </Modal>
          <Modal show={this.state.showCommentModal} onHide={this.handleCommentClose}>
              <Modal.Header closeButton>
                  <Modal.Title>{this.props.restaurant.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  {comments}
                  <CommentForm restaurant_id={this.props.restaurant} />
              </Modal.Body>
              <Modal.Footer>
                  <Button onClick={this.handleCommentClose}>Close</Button>
              </Modal.Footer>
          </Modal>
      </div>
    )
  }
}
