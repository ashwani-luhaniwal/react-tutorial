/**
 * Complex Form in ReactJS
 * Here, we discuss how to use forms from child component.
 */
import React from 'react';

class ComplexForm extends React.Component {
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
            /**
             * Whenever we need to update state from child component, we need to pass the function
             * that will handle updating (updateState) as a prop (updateStateProp)
             */
            <div>
                <Content myDataProp={ this.state.data } updateStateProp={ this.updateState }></Content>
            </div>
        );
    }
}
class Content extends React.Component {
    render() {
        return (
            /**
             * onChange method will trigger state update which will be passed to child input value and 
             * rendered on the screen. 
             */
            <div>
                <input type="text" value={this.props.myDataProp} onChange={this.props.updateStateProp} />
                <h3>{this.props.myDataProp}</h3>
            </div>
        );
    }
}
export default ComplexForm;