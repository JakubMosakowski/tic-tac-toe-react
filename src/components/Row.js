import Square from "./Square"
import React from "react"

export default function Row(props) {
    let iterator = props.rowNumber * 3

    return <div key={props.rowNumber} className="board-row">
        {[...Array(3).keys()].map(key => {
            const i = key + iterator;
            return <Square
                key={i}
                isWinner={isSquareWinner(i, props.result)}
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
            />
        })}
    </div>
}

function isSquareWinner(i, result) {
    if (!result)
        return false

    return result.line.includes(i);
}
