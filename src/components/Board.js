import React from 'react';
import Row from "./Row"

export default function Board(props) {
    return (
        <div className="game-board">
            {[...Array(3).keys()].map(i => {
                return <Row key={i} rowNumber={i} squares={props.squares} result={props.result}
                            onClick={props.onClick}/>
            })}
        </div>
    )
}
