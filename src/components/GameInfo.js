import React from 'react';
import PastMovesContainer from "./pastmoves/PastMovesContainer"

export default function GameInfo(props) {
    return <div className="game-info">
        <div>{props.status}</div>
        <ol>
            <PastMovesContainer
                history={props.history}
                onClick={props.onClick}
                clickedIndex={props.clickedIndex}
            />
        </ol>
    </div>
}
