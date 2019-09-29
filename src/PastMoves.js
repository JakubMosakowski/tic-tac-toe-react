import React from 'react';

export default class PastMoves extends React.Component {

    render() {
        const history = this.props.history
        return (
            history.map((step, move) => {
                const desc = move ? 'Go to move #' + move : 'Go to start';
                const squares = this.mapSquares(step.squares)
                let className = this.getClassName(move);

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

    mapSquares(squares) {
        return squares.map((square) => {
            if (square)
                return square
            else
                return "_"
        })
    }

    getClassName(move) {
        return move === this.props.clickedIndex ? "bolded" : ""
    }

    getTableContent(squares) {
        return (
            <tbody>
            {this.renderRows(squares)}
            </tbody>
        )
    }

    renderRows(squares) {
        let rows = [];
        let iterator = 0;

        for (let i = 0; i < 3; i++) {
            let fields = [];
            for (let j = 0; j < 3; j++) {
                fields.push(<td key={j}>{squares[iterator]}</td>)
                iterator++
            }
            rows.push(<tr key={i}>{fields}</tr>)
        }

        return rows;
    }
}
