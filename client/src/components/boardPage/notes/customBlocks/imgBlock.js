import React, { Component } from 'react'

import { Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

import './customBlocks.css'

import changeimgicon from '../../../../icons/changeimgicon.png'
import zoominicon from '../../../../icons/zoominicon.png'
import zoomouticon from '../../../../icons/zoomouticon.png'

export class imgBlock extends Component {
    constructor(props) {
        super(props)
        let imgsrc = this.props.element.imgsrc
        let imgwidth = this.props.element.imgwidth

        if(imgwidth === undefined) {
            imgwidth = 500
        }
        this.state = {
            imgsrc,
            imgwidth
        }
    }

    changeImg = () => {
        let newImgSrc = window.prompt('Image URL ')
        
        if(newImgSrc !== null) {
            newImgSrc = newImgSrc.replace(/\s+/g, '')
            if(newImgSrc !== ''){
                this.setState({...this.state, imgsrc: newImgSrc})

                const path = ReactEditor.findPath(this.props.editor, this.props.element)
                Transforms.setNodes(
                    this.props.editor,
                    { imgsrc: newImgSrc },
                    { at: path}
            )}
        }
    }
    startChangeSize = (e, mode) => {
        let diff = 0
        
        if(mode === 'increase') diff = 1.01
        if(mode === 'decrease') diff = .995

        //runs size change only if left click or on mobile
        if(e.button === 0 || e.button === undefined) {
            this.interval = setInterval(() => {
                let newWidth = parseInt(this.state.imgwidth) * diff;
                if(newWidth <= 100) newWidth = 100 
                this.setState({...this.state, imgwidth: newWidth})
            }, 12)
        }
    }

    endChangeSize = () => {
        clearInterval(this.interval)
        const path = ReactEditor.findPath(this.props.editor, this.props.element)
        Transforms.setNodes(
            this.props.editor,
            { imgwidth: this.state.imgwidth },
            { at: path}
        )
    }
    render() {
        return (
            <div className='note-image' {...this.props.attributes}>
                <img
                    className='displayImg'
                    src={this.state.imgsrc}
                    alt='Double click this text to insert img' 
                    width={`${this.state.imgwidth}px`}
                /> 
                <img 
                    className='imgBtn'
                    name='sizeUp'             
                    draggable='false'
                    src={zoominicon}       
                    alt=''
                    onMouseDown={e => this.startChangeSize(e, 'increase')} 
                    onMouseUp={this.endChangeSize}
                    onMouseOut={this.endChangeSize}
                    onTouchStart={e => this.startChangeSize(e, 'increase')} 
                    onTouchEnd={this.endChangeSize}
                />
                <img 
                    className='imgBtn'
                    name='sizeDown'  
                    draggable='false'
                    src={zoomouticon}       
                    alt=''                  
                    onMouseDown={e => this.startChangeSize(e, 'decrease')} 
                    onMouseUp={this.endChangeSize}
                    onMouseOut={this.endChangeSize}
                    onTouchStart={e => this.startChangeSize(e, 'decrease')} 
                    onTouchEnd={this.endChangeSize}
                />
                <img 
                    className='imgBtn'
                    name='changeImg'   
                    draggable='false'
                    src={changeimgicon}       
                    alt=''                 
                    onClick={this.changeImg}
                />
                {this.props.children}
            </div>
        )
    }
}

export default imgBlock
