import React, { Component } from 'react'
import { EditorState, Modifier ,RichUtils } from 'draft-js'

import boldIcon from '../../../icons/richstylingicons/boldicon.png'
import italicIcon from '../../../icons/richstylingicons/italicicon.png'
import underlineIcon from '../../../icons/richstylingicons/underlineicon.png'
import headerIcon from '../../../icons/richstylingicons/headericon.png'
import highlightIcon from '../../../icons/richstylingicons/highlighticon.png'
import strikethroughIcon from '../../../icons/richstylingicons/strikethroughicon.png'
import ulIcon from '../../../icons/richstylingicons/ulicon.png'
import olIcon from '../../../icons/richstylingicons/olicon.png'

export class NoteStylingBtns extends Component {
    state = {
        boldClass: 'rsbtn-off',
        italicClass: 'rsbtn-off',
        underlineClass: 'rsbtn-off',
        headerClass: 'rsbtn-off',
        highlightClass: 'rsbtn-off',
        strikethroughClass: 'rsbtn-off',
    }

    componentDidUpdate() {
        const selection = this.props.getEditorState().getSelection()
      
        const focusKey = selection.getFocusKey()
        const inlineStyle = this.props.getEditorState().getCurrentInlineStyle(focusKey)

        if(inlineStyle.has("BOLD")){ if(this.state.boldClass !== 'rsbtn-on') {this.setState({...this.state, boldClass: 'rsbtn-on'})}}
        else {if(this.state.boldClass !== 'rsbtn-off') {this.setState({...this.state, boldClass: 'rsbtn-off'})}}

        if(inlineStyle.has("ITALIC")){ if(this.state.italicClass !== 'rsbtn-on') {this.setState({...this.state, italicClass: 'rsbtn-on'})}}
        else {if(this.state.italicClass !== 'rsbtn-off') {this.setState({...this.state, italicClass: 'rsbtn-off'})}}

        if(inlineStyle.has("UNDERLINE")){ if(this.state.underlineClass !== 'rsbtn-on') {this.setState({...this.state, underlineClass: 'rsbtn-on'})}}
        else {if(this.state.underlineClass !== 'rsbtn-off') {this.setState({...this.state, underlineClass: 'rsbtn-off'})}}

        if(inlineStyle.has("HEADER")){ if(this.state.headerClass !== 'rsbtn-on') {this.setState({...this.state, headerClass: 'rsbtn-on'})}}
        else {if(this.state.headerClass !== 'rsbtn-off') {this.setState({...this.state, headerClass: 'rsbtn-off'})}}

        if(inlineStyle.has("HIGHLIGHT")){ if(this.state.highlightClass !== 'rsbtn-on') {this.setState({...this.state, highlightClass: 'rsbtn-on'})}}
        else {if(this.state.highlightClass !== 'rsbtn-off') {this.setState({...this.state, highlightClass: 'rsbtn-off'})}}

        if(inlineStyle.has("STRIKETHROUGH")){ if(this.state.strikethroughClass !== 'rsbtn-on') {this.setState({...this.state, strikethroughClass: 'rsbtn-on'})}}
        else {if(this.state.strikethroughClass !== 'rsbtn-off') {this.setState({...this.state, strikethroughClass: 'rsbtn-off'})}}
        
    }
    onClick = e => {
        e.preventDefault()
        let newClassName = null
        if(e.target.className === 'rsbtn-off') newClassName = 'rsbtn-on'
        if(e.target.className === 'rsbtn-on') newClassName = 'rsbtn-off'
        
        const editorState = this.props.getEditorState()
        const selection = editorState.getSelection()
        let newState = editorState

        switch(e.target.name) {
            case 'boldbtn':
                newState = RichUtils.toggleInlineStyle(editorState, 'BOLD')
                this.setState({...this.state, boldClass: newClassName})
                break;
            case 'italicbtn':
                newState = RichUtils.toggleInlineStyle(editorState, 'ITALIC')
                this.setState({...this.state, italicClass: newClassName})
                break;
            case 'underlinebtn':
                newState = RichUtils.toggleInlineStyle(editorState, 'UNDERLINE')
                this.setState({...this.state, underlineClass: newClassName})
                break;
            case 'headerbtn':
                newState = RichUtils.toggleInlineStyle(editorState, 'HEADER')
                this.setState({...this.state, headerClass: newClassName})
                break;
            case 'highlightbtn':
                newState = RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT')
                this.setState({...this.state, highlightClass: newClassName})
                break;
            case 'strikethroughbtn':
                newState = RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH')
                this.setState({...this.state, strikethroughClass: newClassName})
                break;
            case 'ulbtn':
                newState = RichUtils.toggleBlockType(editorState, 'unordered-list-item')
                break;
            case 'olbtn':
                newState = RichUtils.toggleBlockType(editorState, 'ordered-list-item')
                break;
            default:
                return null
        }
        this.props.onChange(newState)
    }
    render() {
        return (
            <div className='notes-note-rsbtns'>
                <img name='boldbtn' className={this.state.boldClass} src={boldIcon} alt='' onMouseDown={this.onClick.bind(this)}></img>
                <img name='italicbtn' className={this.state.italicClass} src={italicIcon} alt='' onMouseDown={this.onClick.bind(this)}></img>
                <img name='underlinebtn' className={this.state.underlineClass} src={underlineIcon} alt='' onMouseDown={this.onClick.bind(this)}></img>
                <img name='headerbtn' className={this.state.headerClass} src={headerIcon} alt='' onMouseDown={this.onClick.bind(this)}></img>
                <img name='highlightbtn' className={this.state.highlightClass} src={highlightIcon} alt='' onMouseDown={this.onClick.bind(this)}></img>
                <img name='strikethroughbtn' className={this.state.strikethroughClass} src={strikethroughIcon} alt='' onMouseDown={this.onClick.bind(this)}></img>
                <img name='ulbtn' className='rsbtn-off' src={ulIcon} alt='' onMouseDown={this.onClick.bind(this)}></img>
                <img name='olbtn' className='rsbtn-off' src={olIcon} alt='' onMouseDown={this.onClick.bind(this)}></img>
            </div>
        )
    }
}

export default NoteStylingBtns
