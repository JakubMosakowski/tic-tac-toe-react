import React from 'react';
import Board from './Board'
import ResultsCalculator from "../services/ResultsCalculator"
import GameInfo from "./GameInfo"

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
                <Board
                    result={result}
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
                <GameInfo status={status} history={history} onClick={(step) => this.jumpTo(step)}
                          clickedIndex={this.state.stepNumber}/>
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

        if (isFinished || squares[i]) {
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
