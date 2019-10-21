import React from 'react';
import Board from './Board'
import PastMoves from "./PastMoves"
import ResultsCalculator from "../services/ResultsCalculator"
export default class Game extends React.Component {

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
        const result = ResultsCalculator.calculateWinner(current.squares)
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
        if (ResultsCalculator.isNotFinished(result))
            return `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;

        if (ResultsCalculator.isDraw(result))
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
        const result = ResultsCalculator.calculateWinner(squares)
        const isFinished = !ResultsCalculator.isNotFinished(result)

        if (isFinished|| squares[i]) {
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
}
