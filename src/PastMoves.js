import React from 'react';

export default function PastMoves(props) {
    const history = props.history

    return (
        history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to start';
            const squares = step.squares.map((square) => {
                if(square)
                    return square
                else
                    return "_"
            })
            console.log(squares)
            return (
                <li key={move}>
                    <button onClick={() => props.onClick(move)}>{desc}</button>
                    <table>
                        <tbody>
                        <tr>
                            <td>{squares[0]}</td>
                            <td>{squares[1]}</td>
                            <td>{squares[2]}</td>
                        </tr>
                        <tr>
                            <td>{squares[3]}</td>
                            <td>{squares[4]}</td>
                            <td>{squares[5]}</td>
                        </tr>
                        <tr>
                            <td>{squares[6]}</td>
                            <td>{squares[7]}</td>
                            <td>{squares[8]}</td>
                        </tr>
                        </tbody>
                    </table>
                </li>
            )
        })
    )
}
