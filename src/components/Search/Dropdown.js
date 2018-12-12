import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

      }

      handleSelect = (e) => {
          this.setState({ value: e.target.value });
          console.log(e.target.value);
      }


    render() {
        if(this.props.restaurantfound) {
        return (
            <div>

                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Järjestä</ControlLabel>
                    <FormControl value={this.state.value} onChange={this.handleSelect} componentClass="select" placeholder="select">
                        <option value={null}>Järjestä</option>
                        <option value="asc">Arvosana (Laskeva)</option>
                        <option value="desc">Arvosana (Nouseva)</option>
                    </FormControl>
                </FormGroup>

            </div>
        )
        } else {
            return (
                <div>

                </div>
            )
        }
    }
}
