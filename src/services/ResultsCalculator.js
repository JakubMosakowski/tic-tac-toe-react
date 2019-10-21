
class ResultsCalculator {
    static DRAW = {
        line: [],
        winner: "Draw"
    }

    static NOT_FINISHED = {
        line: [],
        winner: "Not finished"
    }
    static calculateWinner(squares) {
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

        if (this.isBoardFilled(squares))
            return this.DRAW

        return this.NOT_FINISHED;
    }

    static isBoardFilled(squares) {
        return !squares.includes(null)
    }

    static isDraw(result) {
        return result === this.DRAW
    }

    static isNotFinished(result){
        return result === this.NOT_FINISHED
    }
}

export default ResultsCalculator
