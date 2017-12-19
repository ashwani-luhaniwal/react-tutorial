/**
 * Component Life Cycle - ReactJS 
 */

import React from 'react';

class ComponentLifeCylce extends React.Component {
    constructor(props) {
        super(props);

        // initial state
        this.state = {
            data: 0
        }
        // setNewNumber is used to update the state
        this.setNewNumber = this.setNewNumber.bind(this);
    };
    setNewNumber() {
        this.setState({ data: this.state.data + 1 });
    }
    render() {
        return (
            <div>
                <button onClick = { this.setNewNumber }>Increment</button>
                <Content myNumber = { this.state.data }></Content>
            </div>
        );
    }
}
// All lifecylce methods are inside the Content component
// Lifecylce methods will always be invoked in the same order so it is a good practice to write in correct order
class Content extends React.Component { 
    /**
     * componentWillMount - executed before rendering, on both server and client side.
     */
    componentWillMount() {
        console.log('Component WILL MOUNT!');
    }

    /**
     * componentDidMount - executed after first render only on client side. This is where AJAX requests
     * and DOM or state updates should occur. This method is also used for integration with other 
     * JavaScript frameworks and any functions with delayed execution such as setTimeout or setInterval.
     * We are using it to update the state so we can trigger the other lifecylce methods.
     */
    componentDidMount() {
        console.log('Component DID MOUNT!');
    }

    /**
     * componentWillReceiveProps - invoked as soon as props are updated before another render is called.
     * We triggered it from setNewNumber when updated the state.
     */
    componentWillReceiveProps(newProps) {
        console.log('Component WILL RECEIVE PROPS!');
    }

    /**
     * shouldComponentUpdate - should return true or false value. This will determine if component doesn't
     * need to render after state or props are updated, you can return false value.
     * @param {*} newProps 
     * @param {*} newState 
     */
    shouldComponentUpdate(newProps, newState) {
        return true;
    }

    /**
     * componentWillUpdate - called just before rendering.
     * @param {*} nextProps 
     * @param {*} nextState 
     */
    componentWillUpdate(nextProps, nextState) {
        console.log('Component WILL UPDATE!');
    }

    /**
     * componentDidUpdate - called just after rendering.
     * @param {*} prevProps 
     * @param {*} prevState 
     */
    componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!');
    }

    /**
     * componentWillUnmount - called after the component is unmounted from the dom. We are unmounting our component in main.js
     */
    componentWillUnmount() {
        console.log('Component WILL UNMOUNT!');
    }
    render() {
        return (
            <div>
                <h3>{ this.props.myNumber }</h3>
            </div>
        );
    }
}
export default ComponentLifeCylce;