import React, { Component } from 'react'

import { Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

import './customBlocks.css'

import changeimgicon from '../../../../icons/changeimgicon.png'
import zoominicon from '../../../../icons/zoominicon.png'
import zoomouticon from '../../../../icons/zoomouticon.png'
import seResizeIcon from '../../../../icons/seresizeicon.png'

export class imgBlock extends Component {
    constructor(props) {
        super(props)
        let imgsrc = this.props.element.imgsrc
        let imgwidth = this.props.element.imgwidth

        if(imgwidth === undefined) {
            imgwidth = 500
        }
        if(imgwidth > window.innerWidth - 50) imgwidth = window.innerWidth - 50

        this.state = {
            imgsrc,
            imgwidth
        }
        this.myRef = React.createRef()
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
    
    defaultImg = () => {
        const newImgSrc = 'https://webkit.org/demos/srcset/image-src.png'
        this.setState({...this.state, imgsrc: newImgSrc})
        const path = ReactEditor.findPath(this.props.editor, this.props.element)
        Transforms.setNodes(
            this.props.editor,
            { imgsrc: newImgSrc },
            { at: path}
        )
    }

    dragEnd = e => {
        document.body.style.overflow = 'auto'
        const path = ReactEditor.findPath(this.props.editor, this.props.element)
        Transforms.setNodes(
            this.props.editor,
            { imgwidth: this.state.imgwidth },
            { at: path}
        )
    }
    drag = e => {
        document.body.style.overflow = 'hidden'
        e.persist()
        let newWidth = this.state.imgwidth

        let dragX = e.clientX

        if(e.type === 'touchmove') dragX = e.touches[0].clientX

        if(dragX !== 0) {
            newWidth = dragX - this.myRef.getBoundingClientRect().x
            console.log(newWidth)
        }
        
        this.setState({...this.state, imgwidth: newWidth})
    }
    render() {
        return (
            <div className='note-image' {...this.props.attributes}>
                <div 
                    name='sizeChange'
                    draggable='true'  
                    onDragEnd={e => this.dragEnd(e)}
                    onDrag = {e => this.drag(e)}
                    onTouchMove = {e => this.drag(e)}
                    onTouchEnd = {e => this.dragEnd(e)}
                    style={{left: `${this.state.imgwidth - 16}px`}}
                    >
                        <img 
                            src={seResizeIcon}  
                            alt=''
                            draggable='false'
                        />
                </div>
                <img
                    className='displayImg'
                    src={this.state.imgsrc}
                    alt='Double click this text to insert img' 
                    onClick={e => e.preventDefault()}
                    width={`${this.state.imgwidth}px`}
                    onError = {this.defaultImg}
                /> 
                <img 
                    className='imgBtn'
                    name='changeImg'   
                    draggable='false'
                    src={changeimgicon}       
                    alt=''                 
                    onClick={this.changeImg}
                    ref = {e => this.myRef = e}    
                />
                
                {this.props.children}
            </div>
        )
    }
}

export default imgBlock
