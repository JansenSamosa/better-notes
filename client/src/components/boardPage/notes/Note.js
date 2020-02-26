import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Editor, EditorState, convertFromRaw, 
    RichUtils, getDefaultKeyBinding, KeyBindingUtil, 
    Modifier, DefaultDraftBlockRenderMap } from 'draft-js'

import Immutable from 'immutable'
import { saveNote, deleteNote } from '../../../actions/notesActions'

import NoteStylingBtns from './NoteStylingBtns'
import NoteMoveBtns from './NoteMoveBtns'

import deleteNoteIcon from '../../../icons/deletenoteicon.png'
import './notes.css'

export class Note extends Component {
    constructor(props) {
        super(props)

        let editorState = null
        if(this.props.note.content.contentState === null) {
            editorState = EditorState.createEmpty()
        } else {
            const newContentState = {...this.props.note.content.contentState, entityMap: {}}
            editorState = EditorState.createWithContent(convertFromRaw(newContentState))
        }

        this.state = {
            editorState,
        }
    }
    deleteNote = () => {
        this.props.deleteNote(this.props.note.id)
    }
    onChange = editorState => {
        this.setState({...this.state, editorState})
        this.props.saveNote(this.props.note.id, this.state.editorState.getCurrentContent())
    }

    blockStyleFn = contentBlock => {
        const type = contentBlock.getType()
        if(type === 'unordered-list-item' || type === 'ordered-list-item' || type === 'checkbox-list-item') {
            return 'notes-note-li'
        }
    }
    keyBindingFn = e => {
        if(e.keyCode === 9 ) return 'indent'
        if(e.keyCode === 76 && KeyBindingUtil.hasCommandModifier(e)) return 'start-unordered-list'
        if(e.keyCode === 79 && KeyBindingUtil.hasCommandModifier(e)) return 'start-ordered-list'
        if(e.keyCode === 80 && KeyBindingUtil.hasCommandModifier(e)) return 'start-checkbox-list'
        if(e.keyCode === 74 && KeyBindingUtil.hasCommandModifier(e)) return 'header'
        if(e.keyCode === 72 && KeyBindingUtil.hasCommandModifier(e)) return 'highlight'
        if(e.keyCode === 83 && KeyBindingUtil.hasCommandModifier(e)) return 'strikethrough'
        if(e.keyCode === 77 && KeyBindingUtil.hasCommandModifier(e)) return 'remove-inline-style'
        return getDefaultKeyBinding(e)
    }
    handleKeyCommand = (command, editorState) => {
        console.log(command)
        let newState = RichUtils.handleKeyCommand(editorState, command)
        const selection = editorState.getSelection()
        const contentState = editorState.getCurrentContent()

        if(command === 'indent') {
            const newContentState = Modifier.replaceText(contentState, selection, '    ')
            newState = EditorState.push(editorState, newContentState, 'change-block-data')
        }
        if(command === 'start-unordered-list') {
            newState = RichUtils.toggleBlockType(editorState, 'unordered-list-item')
        }
        if(command === 'start-ordered-list') {
            newState = RichUtils.toggleBlockType(editorState, 'ordered-list-item')
        }
        if(command === 'start-checkbox-list') {
            newState = RichUtils.toggleBlockType(editorState, 'checkbox-list-item')
        }
        if(command === 'header') {
            newState = RichUtils.toggleInlineStyle(editorState, 'HEADER')
        }
        if(command === 'highlight') {
            newState = RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT')
        }
        if(command === 'strikethrough') {
            newState = RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH')
        }
        if(command === 'remove-inline-style') {
            let newContentState = null
            const selection = editorState.getSelection()
            newContentState = Modifier.removeInlineStyle(editorState.getCurrentContent(), selection, 'HEADER')
            newContentState = Modifier.removeInlineStyle(newContentState, selection, 'BOLD')
            newContentState = Modifier.removeInlineStyle(newContentState, selection, 'ITALIC')
            newContentState = Modifier.removeInlineStyle(newContentState, selection, 'UNDERLINE')
            newContentState = Modifier.removeInlineStyle(newContentState, selection, 'HIGHLIGHT')
            newContentState = Modifier.removeInlineStyle(newContentState, selection, 'STRIKETHROUGH')
            newState = EditorState.push(editorState, newContentState, 'change-inline-style')
        }
        if(newState) {
            this.onChange(newState)
        }
    }
    getEditorState = () => this.state.editorState
    render() {
        return (
            <div className='notes-note'>
                <NoteMoveBtns note={this.props.note}/>
                <NoteStylingBtns onChange={this.onChange} getEditorState={this.getEditorState}/>
                <Editor 
                    editorState={this.state.editorState} 
                    onChange={this.onChange} 
                    handleKeyCommand={this.handleKeyCommand.bind(this)}
                    keyBindingFn={this.keyBindingFn.bind(this)}
                    blockStyleFn={this.blockStyleFn}
                    blockRenderMap={extendedBlockRenderMap}
                    customStyleMap={styleMap}
                />
                <img className='notes-note-delete' src={deleteNoteIcon} alt='' onClick={this.deleteNote}/>
            </div>
        )
    }
}
const blockRenderMap = Immutable.Map({
    'checkbox-list-item': {
        element: 'li',
        wrapper: <ul></ul>
    }
})
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);


const styleMap = {
    'HEADER': {
        fontSize: '125%'
    },
    'HIGHLIGHT': {
        backgroundColor: 'yellow'
    },
    'STRIKETHROUGH': {
        textDecoration: 'line-through'
    }
}

export default connect(null, { saveNote, deleteNote })(Note)
