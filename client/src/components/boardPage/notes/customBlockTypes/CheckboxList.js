import React, { Component } from 'react'
import { EditorBlock, EditorState } from 'draft-js';

import './customBlocks.css'

const updateDataOfBlock = (editorState, block, newData) => {
    const contentState = editorState.getCurrentContent();
    const newBlock = block.merge({
      data: newData,
    });
    const newContentState = contentState.merge({
      blockMap: contentState.getBlockMap().set(block.getKey(), newBlock),
    });
    return EditorState.push(editorState, newContentState, 'change-block-type');
  };

export class CheckboxList extends Component {
    componentDidMount() {
        
    }
    updateData = e => {
    
        const { block, blockProps } = this.props;

        // This is the reason we needed a higher-order function for blockRendererFn
        const { onChange, getEditorState } = blockProps;
        const data = block.getData();
        const checked = (data.has('checked') && data.get('checked') === true);
        console.log(!checked)
        const newData = data.set('checked', !checked);
        onChange(updateDataOfBlock(getEditorState(), block, newData));
    }

    render() {
        const data = this.props.block.getData();
        const checked = data.get('checked') === true;
        return (
            <div className='checkbox-list'>
                <input type='checkbox' checked={checked}onChange={this.updateData.bind(this)}/>
                <EditorBlock {...this.props}></EditorBlock>
                
                
            </div>
        )
    }
}

export default CheckboxList
