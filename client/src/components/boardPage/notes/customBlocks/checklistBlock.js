import React, { Component } from 'react'

import { Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

import './customBlocks.css'
import checkImg from '../../../../icons/checkicon.png'

export class checklistBlock extends Component {
    state = {
        checked: this.props.element.checked
    }
    componentDidUpdate() {
        const path = ReactEditor.findPath(this.props.editor, this.props.element)
        Transforms.setNodes(
            this.props.editor,
            { checked: this.state.checked },
            { at: path}
        )
    }
    getClass = () => {
        let className = 'unchecked'
        if(this.state.checked) className = 'checked'
        return className
    }
    getChecked = () => {
        let img = null
        if(this.state.checked) img = checkImg
        return img
    }
    getCheckBox = () => {
        return <img 
                    type='checkbox' 
                    src={this.getChecked()}
                    alt=''
                    className={this.getClass()}
                    checked={this.state.checked} 
                    onClick={() => this.setState({checked: !this.state.checked})}
                />
    }
    render() {
        return (
            <div className='block-check-list-item'> 
                <li {...this.props.attributes}>
                    {this.props.children}
                </li>
                {this.getCheckBox()}
            </div>
        )
    }
}

export default checklistBlock
