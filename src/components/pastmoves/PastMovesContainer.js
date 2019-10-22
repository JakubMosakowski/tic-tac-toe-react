import React from 'react';
import PastMovesList from "./PastMovesList"

export default class PastMovesContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAscending: true,
            sortedHistory: this.props.history,
            selectedIndex: this.props.clickedIndex
        }
    }

    render() {
        const buttonText = this.state.isAscending ? "Ascending" : "Descending"

        return (
            <div>
                <div>
                    <button onClick={() => this.handleSortClick()}>{buttonText}</button>
                </div>
                <PastMovesList
                    isAscending={this.state.isAscending}
                    selectedIndex={this.state.selectedIndex}
                    history={this.state.sortedHistory}
                    onClick={(move) => this.props.onClick(move)}
                />
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
}
