import React from 'react';
import Board from './Board'
import PastMoves from "./PastMoves"

export default class Game extends React.Component {
    DRAW = {
        line: [],
        winner: "Draw"
    }

    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true
        }
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber]
        const result = this.calculateWinner(current.squares)
        const status = this.getStatus(result)

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        result={result}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>
                        <PastMoves
                            history={history}
                            onClick={(step) => this.jumpTo(step)}
                            clickedIndex={this.state.stepNumber}
                        />
                    </ol>
                </div>
            </div>
        );
    }

    getStatus(result) {
        if (!result)
            return `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;

        if (result === this.DRAW)
            return result.winner

        return 'Winner: ' + result.winner;
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1]
        const squares = current.squares.slice()

        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return {
                    line: lines[i],
                    winner: squares[a]
                }
            }
        }

        if (this.isDraw(squares))
            return this.DRAW

        return null;
    }

    isDraw(squares) {
        return !squares.includes(null)
    }

}
