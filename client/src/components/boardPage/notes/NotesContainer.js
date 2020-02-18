import React, { Component } from 'react'
import { connect } from 'react-redux'

import Note from './Note'

import './notes.css'

export class NotesContainer extends Component {
    render() {
        return (
            <div className='notes-container'>
                {this.props.board.notes.map(note => (
                    <Note note={note} key={note.id}/>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    board: state.boards.board
})

export default connect(mapStateToProps, {})(NotesContainer)
