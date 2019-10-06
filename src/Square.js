import React, {Component} from 'react';

export default class Square extends Component {
    render() {
        return (
            <button
                className={this.getClassName()}
                onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }

    getClassName() {
        let basicClass = "square"
        return this.props.isWinner ? basicClass + " highlighted" : basicClass
    }
}
