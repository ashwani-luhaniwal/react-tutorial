import React from 'react';

class AwesomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likeCount: 0
        };
        this.onLike = this.onLike.bind(this);
    };
    onLike() {
        let newLikeCount = this.state.likeCount + 1;
        this.setState({ likeCount: newLikeCount });
    }
    render() {
        return (
            <div>
                Likes: <span>{this.state.likeCount}</span>
                <div><button onClick={this.onLike}>Like Me</button></div>
            </div>
        );
    }
}
export default AwesomeComponent;