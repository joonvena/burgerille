import React, { Component } from 'react';
import { Modal, Button, Panel, Row, Col } from 'react-bootstrap';
import CommentForm from '../CommentForm/CommentForm';
import Map from '../Map/MapComponent';
import JwPagination from 'jw-react-pagination';
import './restaurantcard.css';
import Rating from 'react-rating';
import axios from 'axios';

export default class RestaurantInfo extends Component {

    state = {
        comments: [],
        commentsAreFound: false,
        showRestaurantModal: false,
        showCommentModal: false,
        average: [],
        commentAverages: [],
        isLoading: true,
        serverError: false,
        pageOfItems: []
    }

    onChangePage = (pageOfItems) => {
        // update local state with new page of items
        this.setState({ pageOfItems });
    }
    

    openModal = () => {
        if (this.state.commentsAreFound) {
            this.setState({ showRestaurantModal: true })
        }
    }

    handleClose = () => {
        this.setState({ showRestaurantModal: false })
    }

    openCommentModal = () => {
        this.setState({ showCommentModal: true })
    }

    handleCommentClose = () => {
        this.setState({ showCommentModal: false })
    }


    fetchRatings() {
        let id = (this.props.restaurant._id)
        let url = 'https://7b9gsutr00.execute-api.us-east-1.amazonaws.com/dev/getActualAverage/' + id;
        axios.get(url)
            .then(response => {
                this.setState({ average: response.data, isLoading: false })
            }).catch( error => {
                this.setState({ serverError: true, isLoading: false })
            })
    }

    fetchRestaurantComments = (id) => {
        let url = 'https://7b9gsutr00.execute-api.us-east-1.amazonaws.com/dev/restaurants/' + id;
        axios.get(url)
            .then(response => {
                this.setState({ comments: response.data[0].comments, commentsAreFound: true, isLoading: false })
            }).catch( error => {
                this.setState({ serverError: true, isLoading: false })
            })
    }


    fetchRestaurantById() {
        let id = (this.props.restaurant._id)
        let url = 'https://7b9gsutr00.execute-api.us-east-1.amazonaws.com/dev/restaurants/' + id;
        axios.get(url)
            .then(response => {
                this.setState({ comments: response.data[0].comments, commentsAreFound: true, isLoading: false })
            }).catch( error => {
                this.setState({ serverError: true, isLoading: false })
            })
    }


    componentDidMount() {
        this.fetchRestaurantById();
        this.fetchRatings();
    }

    render() {

        if(this.state.isLoading) {
            return <div><img src="/images/loader.gif" alt="Loading bar" /></div>
        }

        if(this.state.serverError) {
            return <div><h3>Palvelimeen ei saatu yhteyttä</h3></div>
        }

        return this.state.average.map((average) => {
            return (
                <div key={average._id}>
                    <Panel>
                        <Panel.Heading className="restaurant_card_header">
                            <Panel.Title componentClass="h3" onClick={this.openModal} style={{ 'cursor': 'pointer' }}>{this.props.restaurant.name}, {this.props.restaurant.address}, {this.props.restaurant.city}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <Rating initialRating={average.average} readonly={true} style={{ 'color': '#ffd942', 'marginBottom': '15px' }} emptySymbol="fa fa-star-o fa-2x"
                                fullSymbol="fa fa-star fa-2x" />
                            <Map restaurant_address={this.props.restaurant.address} restaurant_city={this.props.restaurant.city} />

                        </Panel.Body>
                    </Panel>




                    <Modal show={this.state.showRestaurantModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ 'fontSize': '23px' }}>{this.props.restaurant.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            
                            <Row className="show-grid">
                                <Col xs={12} md={7} className="restaurant_info">
                                    <h3 className="restaurant_card_h3">Yhteystiedot</h3>
                                    <h4><b>Osoite:</b> {this.props.restaurant.address}</h4>
                                    <h4><b>Kaupunki:</b> {this.props.restaurant.city}</h4>
                                    <h4><b>Puhelin:</b> {this.props.restaurant.phone}</h4>
                                    <hr />
                                    <h3 className="restaurant_card_h3">Arvostelut</h3>
                                    <h4><b>Hampurilainen:</b></h4> <Rating initialRating={average.average} readonly={true} style={{ 'color': '#ffd942', 'marginBottom': '15px' }} emptySymbol="fa fa-star-o fa-2x"
                                        fullSymbol="fa fa-star fa-2x" />
                                    <h4><b>Lisukkeet:</b></h4> <Rating initialRating={average.average} readonly={true} style={{ 'color': '#ffd942', 'marginBottom': '15px' }} emptySymbol="fa fa-star-o fa-2x"
                                        fullSymbol="fa fa-star fa-2x" />
                                    <h4><b>Ravintola:</b></h4> <Rating initialRating={average.average} readonly={true} style={{ 'color': '#ffd942', 'marginBottom': '15px' }} emptySymbol="fa fa-star-o fa-2x"
                                        fullSymbol="fa fa-star fa-2x" />
                                </Col>
                                <Col xs={12} md={5}>
                                    <Map restaurant_address={this.props.restaurant.address} restaurant_city={this.props.restaurant.city} />
                                </Col>
                            </Row>

                            <Button className="restaurant_comments_button" onClick={this.openCommentModal}>Kommentit ({this.state.comments.length})</Button>

                        </Modal.Body>
                    </Modal>
                    <Modal show={this.state.showCommentModal} onHide={this.handleCommentClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.props.restaurant.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                           
                            {this.state.pageOfItems.map(comments =>
                                <div key={comments._id}>
                                <p><b>{comments.nickname}</b></p>
                                <p>{comments.text}</p>
                                <p><Rating initialRating={comments.grade} readonly={true} style={{ 'color': '#ffd942', 'marginBottom': '15px' }} emptySymbol="fa fa-star-o fa-2x"
                                                    fullSymbol="fa fa-star fa-2x" /></p>
                            <hr />
                            </div>
                            )}
                            <JwPagination disableDefaultStyles={true} pageSize={5} items={this.state.comments} onChangePage={this.onChangePage} />
                            <CommentForm restaurant_id={this.props.restaurant} fetchComments={this.fetchRestaurantComments} restaurantid={this.props.restaurant._id}/>
                        </Modal.Body>
                    </Modal>
                </div>
            )
        }
        )
    }
}
