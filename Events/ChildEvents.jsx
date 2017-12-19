
import React from 'react';

class ChildEvents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: 'Initial data...'
        }
        this.updateState = this.updateState.bind(this);
    };
    updateState() {
        this.setState({ data: 'Data updated from child component' });
    }
    render() {
        return (
            <div>
                <Content myDataProp={this.state.data}
                    updateStateProp={this.updateState}></Content>
            </div>
        );
    }
}
class Content extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.updateStateProp}>Click</button>
                <h3>{this.props.myDataProp}</h3>
            </div>
        );
    }
}
export default ChildEvents;