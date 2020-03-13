import React, { Component } from 'react'

import { Editor } from 'slate'

import boldIcon from '../../../icons/richstylingicons/boldicon.png'
import italicIcon from '../../../icons/richstylingicons/italicicon.png'
import underlineIcon from '../../../icons/richstylingicons/underlineicon.png'
import headerIcon from '../../../icons/richstylingicons/headericon.png'
import highlightIcon from '../../../icons/richstylingicons/highlighticon.png'
import strikethroughIcon from '../../../icons/richstylingicons/strikethroughicon.png'
import ulIcon from '../../../icons/richstylingicons/ulicon.png'
import olIcon from '../../../icons/richstylingicons/olicon.png'
import clIcon from '../../../icons/richstylingicons/clicon.png'

export class NoteStylingBtns extends Component {
    toggleBlock = (e, format) => {
        e.preventDefault()
        this.props.toggleBlock(this.props.editor, format)
    }
    toggleMark = (e, format) => {
        e.preventDefault()
        this.props.toggleMark(this.props.editor, format)
    }
    render() {
        return (
            <div className='notes-note-rsbtns'>
                <img name='boldbtn' src={boldIcon} alt='' 
                    onMouseDown={e => this.toggleMark(e, 'bold')}></img>
                <img name='italicbtn' src={italicIcon} alt='' 
                    onMouseDown={e => this.toggleMark(e, 'italic')}></img>
                <img name='underlinebtn' src={underlineIcon} alt='' 
                    onMouseDown={e => this.toggleMark(e, 'underline')}></img>
                <img name='headerbtn' src={headerIcon} alt='' 
                    onMouseDown={e => this.toggleMark(e, 'header')}></img>
                <img name='highlightbtn' src={highlightIcon} alt='' 
                    onMouseDown={e => this.toggleMark(e, 'highlight')}></img>
                <img name='strikethroughbtn' src={strikethroughIcon} alt='' 
                    onMouseDown={e => this.toggleMark(e, 'strikethrough')}></img>
                <img name='ulbtn' src={ulIcon} alt='' 
                    onMouseDown={e => this.toggleBlock(e, 'unordered-list')}></img>
                <img name='olbtn' src={olIcon} alt='' 
                    onMouseDown={e => this.toggleBlock(e, 'ordered-list')}></img>
                <img name='olbtn' src={clIcon} alt='' 
                    onMouseDown={e => this.toggleBlock(e, 'check-list')}></img>
            </div>
        )
    }
}

export default NoteStylingBtns
