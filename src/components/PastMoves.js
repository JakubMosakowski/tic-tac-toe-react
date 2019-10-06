import React from 'react';

export default class PastMoves extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAscending: true,
            sortedHistory: this.props.history,
            selectedIndex: this.props.clickedIndex
        }
    }

    render() {
        const history = this.state.sortedHistory
        const buttonText = this.state.isAscending ? "Ascending" : "Descending"

        return (
            <div>
                <div>
                    <button onClick={() => this.handleSortClick()}>{buttonText}</button>
                </div>
                {
                    this.renderPastMoves(history)
                }
            </div>
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(prevProps) === JSON.stringify(this.props) && JSON.stringify(prevState) === JSON.stringify(this.state))
            return

        this.setState({
            sortedHistory: this.getSortedHistory(),
            selectedIndex: this.getSortedIndex()
        })
    }

    renderPastMoves(history) {
        return history.map((step, move) => {
            const desc = this.getDesc(move);
            const squares = this.mapSquares(step.squares)
            let className = this.getClassName(move);

            return (
                <li key={move}>
                    <button className={className}
                            onClick={() => this.props.onClick(this.getMove(move))}>{desc}</button>
                    <table>
                        {this.getTableContent(squares)}
                    </table>
                </li>
            )
        })
    }

    getDesc(move) {
        if (this.state.isAscending)
            return move ? 'Go to move #' + move : 'Go to start'
        else {
            const history = this.props.history
            return move === history.length - 1 ? 'Go to start' : 'Go to move #' + (history.length - 1 - move)
        }
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
        return move === this.state.selectedIndex ? "bolded" : ""
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

    getSortedIndex() {
        return this.state.isAscending ? this.props.clickedIndex : (this.props.history.length - 1 - this.props.clickedIndex)
    }

    getSortedHistory() {
        return this.state.isAscending ? this.props.history : this.props.history.slice().reverse()
    }

    handleSortClick() {
        this.setState({
            isAscending: !this.state.isAscending
        })
    }

    getMove(move) {
        return this.state.isAscending ? move : (this.props.history.length - 1 - move)
    }
}
