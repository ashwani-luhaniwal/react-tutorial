/**
 * React - Event
 * Here, we will be only using one component.
 */
import React from 'react';

class Event extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: 'Initial data...'
        }
        this.updateState = this.updateState.bind(this);
    };
    updateState() {
        this.setState({ data: 'Data updated...' });
    }
    render() {
        return (
            <div>
                <button onClick={this.updateState}>Click</button>
                <h4>{this.state.data}</h4>
            </div>
        );
    }
}
export default Event;