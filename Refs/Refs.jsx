/**
 * React - Refs
 * The ref is used to return a reference to element. Refs should be avoided in most cases, as they
 * can be useful when we need DOM measurements or to add methods to the components.
 */

import React from 'react';
import ReactDOM from 'react-dom';

class Refs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: ''
        }
        this.updateState = this.updateState.bind(this);
        this.clearInput = this.clearInput.bind(this);
    };
    updateState(e) {
        this.setState({ data: e.target.value });
    }
    /**
     * ClearInput function searches for element with ref="myInput" value, resets the state,
     * and adds focus to it after button is clicked.
     */
    clearInput() {
        this.setState({ data: '' });
        ReactDOM.findDOMNode(this.refs.myInput).focus();
    }
    render() {
        return (
            <div>
                <input value={this.state.data} onChange={this.updateState} ref="myInput" />
                <button onClick={this.clearInput}>Clear</button>
                <h4>{this.state.data}</h4>
            </div>
        );
    }
}
export default Refs;