/**
 * ReactJS - State
 * State is the place where data comes from. We should always try to make our state as simple
 * as possible and minimize the number of stateful components. If we have 10 components that 
 * need data from the state, we should create one container component that will keep the state 
 * for all of them.
 */

import React from 'react';

class State extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            header: "Header from state...",
            content: "Content from state..."
        }
    }
    render() {
        return (
            <div>
                <h1>{ this.state.header }</h1>
                <h2>{ this.state.content }</h2>
            </div>
        );
    }
}
export default State;