/**
 * State and Props
 * Here, we combine state and props in your app. We are setting the state in our parent component
 * and passing it down the component tree using props. Inside render function, we are setting
 * headerProp and contentProp used in child components.
 * 
 * Source of data is now coming from the state. When we want to update it, we just need 
 * to update the state, and all child components will be updated.
 */

import React from 'react';

class StateProps extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            header: "Header from props...",
            content: "Content from prop..."
        }
    }
    render () {
        return (
            <div>
                <Header headerProp = { this.state.header } />
                <Content contentProp = { this.state.content } />
            </div>
        );
    }
}
class Header extends React.Component {
    render () {
        return (
            <div>
                <h1>{ this.props.headerProp }</h1>
            </div>
        );
    }
}
class Content extends React.Component {
    render () {
        return (
            <div>
                <h2>{ this.props.contentProp }</h2>
            </div>
        );
    }
}
export default StateProps;