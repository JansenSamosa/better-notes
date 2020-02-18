import { ADD_NOTE, DEL_NOTE, SAVE_NOTE } from '../actions/types'

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