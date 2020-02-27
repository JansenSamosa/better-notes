import React, { Component } from 'react'
import { connect } from 'react-redux'

import { moveNote } from '../../../../actions/notesActions'

import noteMoveIcon from '../../../../icons/notemoveicon.png'

export class NoteMoveBtns extends Component {

    move = (direction) => {
        //direction is up or down
        
        this.props.moveNote(this.props.note.id, direction)
    }
    render() {
        return (
            <div className='notes-note-movebtns'>
                <img src={noteMoveIcon} alt='' name='up' onClick={this.move.bind(this, 'down')}/>
                <img src={noteMoveIcon} alt='' name='down' onClick={this.move.bind(this, 'up')}/>
            </div>
        )
    }
}

export default connect(null, { moveNote })(NoteMoveBtns)
