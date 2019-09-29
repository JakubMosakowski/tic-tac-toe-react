import React from 'react';

export default class PastMoves extends React.Component {

    render() {
        const history = this.props.history
        return (
            history.map((step, move) => {
                const desc = move ? 'Go to move #' + move : 'Go to start';
                const squares = step.squares.map((square) => {
                    if (square)
                        return square
                    else
                        return "_"
                })
                let className = move === this.props.clickedIndex ? "bolded" : "";

                return (
                    <li key={move}>
                        <button className={className}
                                onClick={() => this.props.onClick(move)}>{desc}</button>
                        <table>
                            {this.getTableContent(squares)}
                        </table>
                    </li>
                )
            })
        )
    }

    getTableContent(squares) {
        const rows = this.getRows(squares)
        return (
            <tbody>
            {rows}
            </tbody>
        )
    }

    getRows(squares) {
        let rows = [];
        let iterator = 0;

        for (let i = 0; i < 3; i++) {
            let fields = [];
            for (let j = 0; j < 3; j++) {
                fields.push(<td>{squares[iterator]}</td>)
                iterator++
            }
            rows.push(<tr>{fields}</tr>)
        }

        return rows;
    }
}
