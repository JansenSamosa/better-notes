import React, { Component } from 'react'
import { connect } from 'react-redux'
import { EditorState, convertFromRaw, 
    RichUtils, getDefaultKeyBinding, KeyBindingUtil, 
    Modifier, DefaultDraftBlockRenderMap } from 'draft-js'

import Editor from 'draft-js-plugins-editor'
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import createImagePlugin from 'draft-js-image-plugin'

import Immutable from 'immutable'
import { saveNote } from '../../../actions/notesActions'

import NoteBtns from './NoteBtns'
import NoteStylingBtns from './NoteStylingBtns'

import './notes.css'

const imagePlugin = createImagePlugin()
const linkifyPlugin = createLinkifyPlugin({
    component: (props) => (
        <a {...props} onClick={() => window.open(props.href)}/>
    )
})

const plugins = [
    linkifyPlugin, imagePlugin
]

export class Note extends Component {
    constructor(props) {
        super(props)

        let editorState = null
        if(this.props.note.content.contentState === null) {
            editorState = EditorState.createEmpty()
        } else {
            console.log(this.props.note.content.contentState)
            let newContentState = this.props.note.content.contentState
            if(this.props.note.content.contentState.entityMap === undefined) {
                newContentState = {...this.props.note.content.contentState,entityMap: {}}
            }
                
            console.log(newContentState)
            editorState = EditorState.createWithContent(convertFromRaw(newContentState))
        }

        this.state = {
            editorState,
        }
        
    }
    componentDidMount() {
        setTimeout(() => {
            this.focus()
        }, 200)
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
    focus = () => {
        this.editor.focus()
    }
    getEditorState = () => this.state.editorState

    render() {
        return (
            <div className='notes-note' >  
                <NoteStylingBtns onChange={this.onChange} getEditorState={this.getEditorState}/>           
                <Editor 
                    ref={element => {this.editor = element}}
                    editorState={this.state.editorState} 
                    onChange={this.onChange} 
                    handleKeyCommand={this.handleKeyCommand.bind(this)}
                    keyBindingFn={this.keyBindingFn.bind(this)}
                    blockStyleFn={this.blockStyleFn}
                    blockRenderMap={extendedBlockRenderMap}
                    customStyleMap={styleMap}
                    plugins={plugins}
                />
                <NoteBtns 
                    note={this.props.note}
                    onChange={this.onChange} 
                    getEditorState={this.getEditorState}
                />
            </div>
        )
    }
}//<img className='notes-note-delete' src={deleteNoteIcon} alt='' onClick={this.deleteNote}/>
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

export default connect(null, { saveNote })(Note)
