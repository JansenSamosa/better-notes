import React, { Component } from 'react'
import { connect } from 'react-redux'

import { deleteNote } from '../../../../actions/notesActions'

import deleteNoteIcon from '../../../../icons/deletenoteicon.png'

export class NoteDeleteBtn extends Component {
    componentDidMount() {
        console.log("HI")
    }
    deleteNote = () => {
        this.props.deleteNote(this.props.note.id)
    }
    render() {
        return (
            <div>
                <img className='notes-note-deletebtn' src={deleteNoteIcon} alt='' onClick={this.deleteNote}/>
            </div>
        )
    }
}

export default connect(null, {deleteNote})(NoteDeleteBtn)
