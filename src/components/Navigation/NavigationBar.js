import React, { Component } from 'react';
import './navigation.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import AddRestaurantForm from '../AddRestaurant/AddRestaurant';
import { Link } from 'react-router-dom';

export default class NavigationBar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false
          };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
       
      }

      handleShow() {
          this.setState({ show: true });
      }


      handleClose() {
        this.setState({ show: false  });
      }


  render() {
    return (
      <div>

             <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title style={{'fontSize': '23px'}}>Ravintolan lisäys</Modal.Title>
            </Modal.Header>
            <Modal.Body>
        
            <AddRestaurantForm />
               
            </Modal.Body>
            </Modal>

           <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                      <Link to="/">BurgerLoversFinland</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem eventKey={1} componentClass={Link} href="/" to="/">
                        Etusivu
                    </NavItem>
                    <NavItem eventKey={2} componentClass={Link} to="#" onClick={this.handleShow}>
                        Lisää Ravintola
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        
      </div>
    )
  }
}
