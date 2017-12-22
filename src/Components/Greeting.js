import React, {Component} from 'react';

export default class Greeting extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    state = {
        message: this.props.message
    }

    onClick() {
        this.setState({
            message: "Some new message"
        })
    }
    render() {
        var {message} = this.state;
        return (
            <div>
                <h2> {message} </h2>
                <input type="button" 
                    onClick={this.onClick}
                    value="Click me"/>
            </div>
        );
    }
}

