import React from 'react';
import Square from './Square';

export default class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        )
    }

    render() {
        return this.renderRows()
    }

    renderRows() {
        let rows = []
        let iterator = 0

        for (let i = 0; i < 3; i++) {
            let fields = []
            for (let j = 0; j < 3; j++) {
                fields.push(this.renderSquare(iterator))
                iterator++
            }
            rows.push(<div key={i} className="board-row">{fields}</div>)
        }

        return (
            <div>
                {rows}
            </div>
        )
    }
}
