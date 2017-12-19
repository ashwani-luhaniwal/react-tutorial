/**
 * ReactJS - Forms
 * Simple Form
 */
import React from 'react';

class Forms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: 'Initial data...'
        }
        this.updateState = this.updateState.bind(this);
    };
    updateState(e) {
        this.setState({ data: e.target.value });
    }
    render() {
        return (
            // set input form with value = {this.state.data}. This allows us to update the state whenever the input
            // value changes. We are using onChange event which will watch the input changes and update the state.
            <div>
                <input type="text" value={ this.state.data } onChange={ this.updateState } />
                <h4>{ this.state.data }</h4>
            </div>
        );
    }
}
export default Forms;