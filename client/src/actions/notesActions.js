import { ADD_NOTE, DEL_NOTE, SAVE_NOTE, MOVE_NOTE, LOCK_NOTE } from '../actions/types'

import { convertToRaw } from 'draft-js'

export const addNote = () => dispatch => {
    dispatch({type: ADD_NOTE})
}

export const saveNote = (noteid, newContent) => dispatch => {
    dispatch({
        type: SAVE_NOTE,
        payload: {
            id: noteid,
            content: {
                contentState: convertToRaw(newContent)
            }
        }
    })
}

export const deleteNote = noteid => dispatch => {
    dispatch({
        type: DEL_NOTE,
        payload: {
            id: noteid
        }
    })
}

export const moveNote = (noteid, direction) => (dispatch, getState) => {
    const notes = getState().boards.board.notes

    const note = notes.filter(note => note.id === noteid)[0]
    const index = notes.indexOf(note)

    let to = null
    if(direction === 'up') to = index + 1
    if(direction === 'down') to = index - 1
    
    if(to < 0) to = 0
    if(to > notes.length - 1) to = notes.length - 1
    
    dispatch({
        type: MOVE_NOTE,
        payload: {
            from: index,
            to
        }
    })
}

export const lockNote = (noteid, locked) => dispatch => {
    dispatch({
        type: LOCK_NOTE,
        payload: {
            id: noteid,
            locked
        }
    })
}