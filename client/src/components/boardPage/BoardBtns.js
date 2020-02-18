import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addNote } from '../../actions/notesActions'
import { saveBoard } from '../../actions/boardActions'

import addNoteIcon from '../../icons/newnoteicon.png'
import saveBoardIcon from '../../icons/saveboardicon.png'

import './boardBtns.css'

export class BoardBtns extends Component {
    render() {
        return (
            <div>
                <img 
                    src={addNoteIcon} 
                    alt='' 
                    className='board-btns-add'
                    onClick={() => this.props.addNote()}
                />
                <img 
                    src={saveBoardIcon} 
                    alt='' 
                    className='board-btns-save'
                    onClick={() => this.props.saveBoard()}
                />
            </div>
        )
    }
}

export default connect(null, { addNote, saveBoard})(BoardBtns)
