import React, { Component } from 'react'
import { EditorBlock, EditorState, Modifier, SelectionState } from 'draft-js';

import checkImg from '../../../../icons/checkicon.png'
import './customBlocks.css'

export class CheckboxList extends Component {
    constructor(props) {
        super(props)

        let checked = null

        if(checked === null) {
            const editorState = props.blockProps.getEditorState()
            const contentState = editorState.getCurrentContent()
            const contentStateWithEntity = contentState.createEntity('BOOLEAN', 'MUTABLE', {
                checked: false
            })
            console.log(contentState)
            console.log(contentStateWithEntity)
        }
        

        this.state = {
            checked: false
        }
    }

    check = (e) => {
        e.preventDefault()
        this.setState({checked: !this.state.checked})
        console.log(this.props)
    }
    checkbox = () => {
        if(this.state.checked) {
            return <button onClick={this.check.bind(this)}> <img src={checkImg} alt=''/> </button>
        } else {
            return <button onClick={this.check.bind(this)} /> 
        }
    }
    render() {
        return (
            <div className='checkbox-list'>
                {this.checkbox()}
                <EditorBlock {...this.props}></EditorBlock>
            </div>
        )
    }
}

export default CheckboxList
