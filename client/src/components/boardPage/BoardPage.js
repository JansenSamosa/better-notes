import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getBoard } from '../../actions/boardActions'

import NotesContainer from './notes/NotesContainer'
import BoardBtns from './BoardBtns'
import Navbar from './overlay/Navbar'

export class BoardPage extends Component {
    componentDidMount() {
        this.props.getBoard(this.props.match.params.id)
    }
    componentDidUpdate() {
        this.props.getBoard(this.props.match.params.id)
    }
    render() {
        return (
            <div>
                <NotesContainer />
                <BoardBtns />
                <Navbar />
            </div>
        )
    }
}

export default connect(null, {getBoard})(BoardPage)
