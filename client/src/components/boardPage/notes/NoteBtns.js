import React, { Component } from 'react'
import { connect } from 'react-redux'

import { lockNote } from '../../../actions/notesActions'

import NoteDeleteBtn from './noteButtons/NoteDeleteBtn'
import NoteMoveBtns from './noteButtons/NoteMoveBtns'

import NoteStylingBtns from './NoteStylingBtns'

import btnsUnlocked from '../../../icons/btnsunlocked.png'
import btnsLocked from '../../../icons/btnslocked.png'

export class NoteBtns extends Component {
    state = {
        locked: this.props.note.locked
    }
    componentDidMount() {
        console.log(this.props.note)
    }
    toggleLock = () => {
        let locked = null
        if(this.state.locked === false) locked = true
        if(this.state.locked === true) locked = false
        this.setState({locked})
        this.props.lockNote(this.props.note.id, locked)
    }
    getToggleImg = () => {
        const locked = this.state.locked

        if(locked) return btnsLocked
        else if(!locked) return btnsUnlocked 
    }
    renderBtns = () => {
        if(!this.state.locked) {
            return (
                <div>
                    <NoteDeleteBtn note={this.props.note}/>
                    <NoteMoveBtns note={this.props.note} />
                    <NoteStylingBtns 
                        note={this.props.note}
                        editor={this.props.editor} 
                        toggleBlock={this.props.toggleBlock} 
                        toggleMark={this.props.toggleMark}
                        isBlockActive={this.props.isBlockActive}
                        isMarkActive={this.props.isMarkActive}
                        removeAllMarks={this.props.removeAllMarks}
                    />            
                </div>
            )
        } else {
            return null
        }
    }
    render() {
        return (
            <div>
                {this.renderBtns()}
                <img 
                    src={this.getToggleImg()}
                    className='notes-note-lockbtn' 
                    onClick={this.toggleLock} 
                    alt=''
                ></img>
            </div>
        )
    }
}

export default connect(null, {lockNote})(NoteBtns)
