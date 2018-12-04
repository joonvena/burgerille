import React, { Component } from 'react';
import './navigation.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class NavigationBar extends Component {
  render() {
    return (
      <div>

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
                    <NavItem eventKey={2} componentClass={Link} href="/" to="/lisaaravintola">
                        Lisää Ravintola
                    </NavItem>
                    <NavItem eventKey={3} componentClass={Link} href="/" to="/kirjaudu">
                        Kirjaudu
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        
      </div>
    )
  }
}
