import { GET_ALL_BOARDS, GET_BOARD, BOARD_LOADED, BOARD_LOADING, DELETE_BOARD } from '../actions/types'
import { ADD_NOTE, DEL_NOTE, SAVE_NOTE } from '../actions/types'

import uuid from 'uuid'

const initialState = {
    boards: [],
    board: {
        name: null,
        ownerID: null,
        boardID: null,
        notes: [],
    },
    loading: false
}

const boardReducer = (state = initialState, action) => {
    let newNotes = null
    let newState = state
    switch(action.type) {
        //BOARD TYPES
        case GET_ALL_BOARDS:
            return {...state, boards: action.payload.boards}
        case GET_BOARD:
            return {...state, board: action.payload}
        case DELETE_BOARD:
            return {...state, board: {name: null, ownerID: null, boardID: null, notes: null}}
        case BOARD_LOADING: 
            return {...state, loading: true}
        case BOARD_LOADED:
            return {...state, loading: false}

        //NOTE TYPES
        case ADD_NOTE:
            newNotes = state.board.notes
            newNotes.push({
                id: uuid.v4(),
                content: {
                    contentState: null
                }
            })
            newState = {...state, board: {...state.board, notes: newNotes}}
            return newState
        case SAVE_NOTE:
            newNotes = state.board.notes.map(note => {
                if(note.id === action.payload.id) {
                    note.content = action.payload.content
                }
                return note
            })
            newState = {...state, board: {...state.board, notes: newNotes}}
            return newState
        case DEL_NOTE:
            newNotes = state.board.notes.filter(note => (note.id !== action.payload.id))
            newState = {...state, board: {...state.board, notes: newNotes}}
            return newState
        default:
            return state
    }
}

export default boardReducer