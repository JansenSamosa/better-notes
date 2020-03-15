import React, { Component, useEffect, useMemo, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { createEditor, Transforms, Editor, Range, Text } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import isUrl from 'is-url'
import { saveNote } from '../../../actions/notesActions'

import NoteBtns from './NoteBtns'
import ChecklistBlock from './customBlocks/checklistBlock'
import ImgBlock from './customBlocks/imgBlock'

import './notes.css'

import NoteStylingBtns from './NoteStylingBtns'

const LIST_TYPES = ['unordered-list', 'ordered-list', 'check-list']
const MARK_TYPES = ['bold', 'italic', 'underline', 'highlight', 'strikethrough', 'header']

const Note = (props) => {
    const editor = useMemo(() => editorOptions(withLinks(withHistory(withReact(createEditor())))), [])

    const [value, setValue] = useState(
        JSON.parse(props.note.content.slateValue) || [
        {
            type: 'paragraph',
            children:[{ text: 'Hello World'}]
        }
    ])

    const [locked, setLocked] = useState(props.locked)

    const renderElement = useCallback(blockprops => {
        return <Element {...blockprops} {...props} locked={locked} editor={editor}/>
    }, [])
    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])

    return (
        
        <Slate 
            editor={editor} 
            value={value} 
            onChange={value => {    
                setValue(value)          
                props.saveNote(props.note.id, JSON.stringify(value))
            }}
            >
            <div className='notes-note'>
                <NoteBtns 
                    setLocked={setLocked}
                    note={props.note}
                    editor={editor} 
                    toggleBlock={toggleBlock} 
                    toggleMark={toggleMark}
                    isBlockActive={isBlockActive}
                    isMarkActive={isMarkActive}
                    removeAllMarks={removeAllMarks} 
                    insertImage={insertImage}
                />
                <Editable
                    autoFocus
                    spellCheck={false}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={e => {
                        keyBindings(e, editor)
                    }}
                
                />
                
            </div>      
        </Slate>
    )
}

const keyBindings = (e, editor) => {
    const key = e.key  
    if(key === 'Tab'){
        e.preventDefault()
        return editor.insertText('    ')
    }
    if(e.ctrlKey) {
        switch(key) {
            case 'y':
                e.preventDefault()
                return insertImage(editor)
            case 'l':
                e.preventDefault()
                return toggleBlock(editor, 'unordered-list')
            case 'o':
                e.preventDefault()
                return toggleBlock(editor, 'ordered-list')
            case 'p':
                e.preventDefault()
                return toggleBlock(editor, 'check-list')
            case 'b':
                e.preventDefault()
                return toggleMark(editor, 'bold')
            case 'i':
                e.preventDefault()
                return toggleMark(editor, 'italic')
            case 'u':
                e.preventDefault()
                return toggleMark(editor, 'underline')
            case 's':
                e.preventDefault()
                return toggleMark(editor, 'strikethrough')
            case 'h':
                e.preventDefault()
                return toggleMark(editor, 'highlight')
            case 'j':
                e.preventDefault()
                return toggleMark(editor, 'header')
            case 'm':
                return removeAllMarks(editor)
            default:
                return null
        }
    }
}

const Element = (props) => {
    switch(props.element.type) {
        case 'link':
            return <a 
                href={props.element.url}
                {...props.attributes} 
                onClick={() => window.open(props.element.url)}
                style={{cursor:'pointer'}}
            >
                {props.children}
            </a>
        case 'list-item':
            return <li {...props.attributes}>{props.children}</li>
        case 'check-list-item':
            return <ChecklistBlock {...props} editor={props.editor}/>
        case 'unordered-list':
            return <ul {...props.attributes}>{props.children}</ul>
        case 'ordered-list':
            return <ol {...props.attributes}>{props.children}</ol>
        case 'check-list':
            return <ul {...props.attributes}>{props.children}</ul>
        case 'image':
            return <ImgBlock {...props} editor={props.editor} locked={props.locked}/>
        default:
            return <p {...props.attributes}>{props.children}</p>
    }
}

const toggleBlock = (editor, blockType) => {
    const match = isBlockActive(editor, blockType)
    const isList = LIST_TYPES.includes(blockType)


    Transforms.unwrapNodes(editor, {
        match: n => LIST_TYPES.includes(n.type),
        split: true
    })
    
    let type = 'paragraph'

    if(!match) {
        type = blockType
    }

    if(isList && !match) {
        type = 'list-item'
    }
    if(blockType === 'check-list' && !match) {
        type = 'check-list-item'
    }
    Transforms.setNodes(
        editor,
        { type: type },
        { match: n => Editor.isBlock(editor, n)}
    )

    if(!match && isList) {
        Transforms.wrapNodes(editor, {type: blockType, children: []})
    }
}

const isBlockActive = (editor, blockType) => {
    let [match] = Editor.nodes(editor, {match: n => n.type === blockType})
    if(match) match = true
    return match
}

const Leaf = props => {
    let children = props.children

    if(props.leaf.header) {
        children = <span className='header'>{children}</span>
    }
    if(props.leaf.bold) {
        children = <span className='bold'>{children}</span>
    }
    if(props.leaf.italic) {
        children = <span className='italic'>{children}</span>
    }
    if(props.leaf.underline) {
        children = <span className='underline'>{children}</span>
    }
    if(props.leaf.highlight) {
        children = <span className='highlight'>{children}</span>
    }
    if(props.leaf.strikethrough) {
        children = <span className='strikethrough'>{children}</span>
    }
    return <span {...props.attributes}>{children}</span>
}

const toggleMark = (editor, mark) => {
    const isActive = isMarkActive(editor, mark)
    if(!isActive) {
        Editor.addMark(editor, mark, true)
    } else {
        Editor.removeMark(editor, mark)
    }
}

const removeAllMarks = editor => {
    MARK_TYPES.forEach(type => Editor.removeMark(editor, type))
}

const isMarkActive = (editor, mark) => {
    const marks = Editor.marks(editor) 
    const isActive = marks[mark] ? true: false
    return isActive
}

//Links
const withLinks = editor => {
    const { insertData, insertText, isInline } = editor
  
    editor.isInline = element => {
      return element.type === 'link' ? true : isInline(element)
    }
  
    editor.insertText = text => {
      if (text && isUrl(text)) {
        wrapLink(editor, text)
      } else {
        insertText(text)
      }
    }
  
    editor.insertData = data => {
      const text = data.getData('text/plain')
  
      if (text && isUrl(text)) {
        wrapLink(editor, text)
      } else {
        insertData(data)
      }
    }
  
    return editor
}
const isLinkActive = editor => {
    const [link] = Editor.nodes(editor, { match: n => n.type === 'link' })
    return !!link
}
const unwrapLink = editor => {
    Transforms.unwrapNodes(editor, { match: n => n.type === 'link' })
}
const wrapLink = (editor, url) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor)
      }
    
      const { selection } = editor
      const isCollapsed = selection && Range.isCollapsed(selection)
      const link = {
        type: 'link',
        url,
        children: isCollapsed ? [{ text: url }] : [],
      }
    
      if (isCollapsed) {
        Transforms.insertNodes(editor, link)
      } else {
        Transforms.wrapNodes(editor, link, { split: true })
        Transforms.collapse(editor, { edge: 'end' })
      }
}

const insertImage = (editor) => {
    Transforms.insertNodes(editor, {type: 'image', imgsrc: 'https://webkit.org/demos/srcset/image-src.png',children: [{ text: ''}]})
    Transforms.insertNodes(editor, {type: 'paragraph', children: [{ text: ''}]})
}

const editorOptions = editor => {
    const { isVoid } = editor

    editor.isVoid = element => {
        return element.type === 'image' ? true : isVoid(element)
    }

    return editor
}
export default connect(null, { saveNote })(Note)
