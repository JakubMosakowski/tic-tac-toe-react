import React from 'react';

export default function Square(props) {
    return (
        <button
            className={getClassName(props.isWinner)}
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function getClassName(isWinner) {
    let basicClass = "square"
    return isWinner ? basicClass + " highlighted" : basicClass
}

