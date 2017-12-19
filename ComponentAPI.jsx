/**
 * React - Component API
 * Here, we will discuss 3 methods: - setState(), forceUpdate() and ReactDOM.findDOMNode()
 * In new ES6 classes, we have to manually bind this.
 */

import React from 'react';
import ReactDOM from 'react-dom';

class ComponentAPI extends React.Component {
    constructor () {
        super();

        this.state = {
            data: []
        }

        this.setStateHandler = this.setStateHandler.bind(this);

        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);

        this.findDomNodeHandler = this.findDomNodeHandler.bind(this);
    };
    setStateHandler() {
        var item = "setState...";
        var myArray = this.state.data.slice();
        myArray.push(item);
        /**
         * Set State
         * setState() method is used to update the state of component. This method will not replace 
         * the state, but only add changes to original state.
         */
        this.setState({ data: myArray })
    };
    forceUpdateHandler() {
        /**
         * Force Update
         * Sometimes we might want to update the component manually. This can be achieved using 
         * forceUpdate() method.
         */
        this.forceUpdate();
    };
    findDomNodeHandler() {
        var myDiv = document.getElementById('myDiv');
        /**
         * Find DOM Node
         * For DOM manipulation, we can use ReactDOM.findDOMNode() method.
         */
        ReactDOM.findDOMNode(myDiv).style.color = 'green';
    };
    render() {
        return (
            <div>
                <button onClick = { this.setStateHandler }>Set State</button>
                <h4>State Array: { this.state.data }</h4>
                <button onClick = { this.forceUpdateHandler }>Force Update</button>
                <h4>Random number: { Math.random() }</h4>
                <button onClick = { this.findDomNodeHandler }>Find DOM Node</button>
                <div id="myDiv">Node</div>
            </div>
        );
    }
}
export default ComponentAPI;