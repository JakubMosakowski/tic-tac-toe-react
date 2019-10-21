import React from 'react';
import PastMoves from "./PastMoves"

export default function GameInfo(props) {
    return <div className="game-info">
        <div>{props.status}</div>
        <ol>
            <PastMoves
                history={props.history}
                onClick={props.onClick}
                clickedIndex={props.clickedIndex}
            />
        </ol>
    </div>
}
