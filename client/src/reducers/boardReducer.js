import {GET_ALL_BOARDS, GET_BOARD, BOARD_LOADED, BOARD_LOADING, DELETE_BOARD} from '../actions/types'

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
    switch(action.type) {
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
        default:
            return state
    }
}

export default boardReducer