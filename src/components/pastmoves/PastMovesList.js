import React from 'react';
import PastMove from "./PastMove"

export default function PastMovesList({isAscending, selectedIndex, history, onClick}) {
    return history.map((step, move) => {
        const desc = getDescription(isAscending, move, history);
        const squares = mapSquares(step.squares)
        let className = getClassName(selectedIndex, move);

        return (
            <li key={move}>
                <button className={className}
                        onClick={() => onClick(getMove(isAscending, move, history))}>{desc}</button>
                <table>
                    <tbody>
                    <PastMove squares={squares}/>
                    </tbody>
                </table>
            </li>
        )
    })
}

function getDescription(isAscending, move, history) {
    if (isAscending)
        return move ? 'Go to move #' + move : 'Go to start'
    else {
        return move === history.length - 1 ? 'Go to start' : 'Go to move #' + (history.length - 1 - move)
    }
}

function getMove(isAscending, move, history) {
    return isAscending ? move : (history.length - 1 - move)
}

function mapSquares(squares) {
    return squares.map((square) => {
        if (square)
            return square
        else
            return "_"
    })
}

function getClassName(selectedIndex, move) {
    return move === selectedIndex ? "bolded" : ""
}
