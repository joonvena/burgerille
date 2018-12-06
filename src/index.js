import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import * as serviceWorker from './serviceWorker';
import FrontPage from './components/Search/SearchBar';
import Navigation from './components/Navigation/NavigationBar';

ReactDOM.render(
    <BrowserRouter>

        <div>

            <Navigation />

            <Grid fluid>
                <Row className="show-grid" style={{ 'height': '100vh' }}>
                    <Col xs={12} sm={3} />

                    <Col xs={12} sm={6} className="site_container">

                        <Switch>
                        <Route path="/" component={FrontPage}/> 
                        </Switch>

                    </Col>

                    <Col xs={12} sm={3} />
                </Row>

            </Grid>




        </div>
    </BrowserRouter>, document.querySelector('.container-fluid'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
