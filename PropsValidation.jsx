/**
 * ReactJS - Props Validation
 * Properties validation is useful way to force the correct usage of components. 
 * This will help during development to avoid future bugs and problems, once the
 * app becomes larger. It also makes the code more readable.
 * 
 * Validating Props
 * Here, we are creating PropsValidation component with all props which we need.
 */
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

class PropsValidation extends React.Component {
    render () {
        return (
            <div>
                <h1> Hello, { this.props.name }</h1>
                <h3>Array: {this.props.propArray }</h3>
                <h3>Bool: { this.props.propBool }</h3>
                <h3>Func: { this.props.propFunc(3) }</h3>
                <h3>Number: { this.props.propNumber }</h3>
                <h3>String: { this.props.propString }</h3>
            </div>
        );
    }
}
/**
 * PropsValidation.propTypes is used for props validation. If some of the props aren't
 * using the correct type that we assigned, we will get a console warning.
 */
PropsValidation.propTypes = {
    name: PropTypes.string,
    propArray: PropTypes.array.isRequired,
    propBool: PropTypes.bool.isRequired,
    propFunc: PropTypes.func,
    propNumber: PropTypes.number,
    propString: PropTypes.string,
};
/**
 * After specifying validation patterns, we will set PropsValidation.defaultProps
 */
PropsValidation.defaultProps = {
    name: 'Ashwani Luhaniwal',
    propArray: [1, 2, 3, 4, 5],
    propBool: true,
    propFunc: function (e) {
        return e;
    },
    propNumber: 1,
    propString: "Check out Prop Validation..."
}
export default PropsValidation;