/**
 * ReactJS - Props
 * Difference between state and props is that props are immutable. 
 * This is why the container should define the state that can be updated and changed,
 * while the child components should only pass data from the state using props.
 */

import React from 'react';

class Props extends React.Component {
    render () {
        return (
            <div>
                <h1>{ this.props.headerProp }</h1>
                <h2>{ this.props.contentProp }</h2>
                <h3>{ this.props.headProp }</h3>
                <h4>{ this.props.conProp }</h4>
            </div>
        );
    }
}
/**
 * Default Props
 * Set default property values directly on the component constructor instead of 
 * adding it to ReactDOM.render() element
 */
Props.defaultProps = {
    headProp: "New Header from props...",
    conProp: "New Content from props..."
}
export default Props;