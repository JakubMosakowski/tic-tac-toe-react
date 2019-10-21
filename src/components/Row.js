import Square from "./Square"
import React from "react"

export default function Row(props) {
    let fields = []
    let iterator = props.rowNumber * 3

    for (let j = 0; j < 3; j++) {
        fields.push(renderSquare(iterator, props))
        iterator++
    }

    return <div key={props.rowNumber} className="board-row">{fields}</div>
}

function renderSquare(i, {squares, onClick, result}) {
    return (
        <Square
            key={i}
            isWinner={isSquareWinner(i, result)}
            value={squares[i]}
            onClick={() => onClick(i)}
        />
    )
}

function isSquareWinner(i, result) {
    if (!result)
        return false

    return result.line.includes(i);
}
