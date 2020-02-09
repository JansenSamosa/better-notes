import {GET_ALL_BOARDS, GET_BOARD, BOARD_LOADED, BOARD_LOADING, DELETE_BOARD} from '../actions/types'
import { returnError, clearError } from './errorActions'
import axios from 'axios'

export const getAllBoards = () => (dispatch, getState) => {
    dispatch(clearError())
    dispatch({type: BOARD_LOADING})
    axios.get('/api/boards/myboards', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ALL_BOARDS,
                payload: {
                    boards: res.data
                }
            })
            dispatch({type: BOARD_LOADED})
        })
        .catch(err => {
            dispatch(returnError(err.response.data.msg, err.response.status, "BOARD_ERROR"))
            dispatch({type: BOARD_LOADED})
        })
}

export const getBoard = boardID => (dispatch, getState) => {
    dispatch(clearError())
    dispatch({type: BOARD_LOADING})
    axios.get(`/api/boards/myboards/${boardID}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_BOARD,
                payload: {
                    name: res.data.name,
                    ownerID: res.data.ownerID,
                    boardID: res.data._id,
                    notes: res.data.notes,
                }
            })
            dispatch({type: BOARD_LOADED})
        })
        .catch(err => {
            dispatch(returnError(err.response.data.msg, err.response.status, "BOARD_ERROR"))
            dispatch({type: BOARD_LOADED})
        })
}

export const createBoard = boardName => (dispatch, getState) => {
    dispatch(clearError())
    dispatch({type: BOARD_LOADING})
    axios.post('/api/boards/myboards/newboard', { name: boardName }, tokenConfig(getState))
        .then(res => {
            dispatch({type: BOARD_LOADED})
        })
        .catch(err => {
            dispatch(returnError(err.response.data.msg, err.response.status, "BOARD_ERROR"))
            dispatch({type: BOARD_LOADED})
        })
}
export const saveBoard = () => (dispatch, getState) => {
    dispatch(clearError())
    dispatch({type: BOARD_LOADING})
    const newBoard = {
        name: getState().boards.board.name,
        notes: getState().boards.board.notes
    }
    axios.put(`/api/boards/myboards/:${getState().boards.board.boardID}/update`, newBoard, tokenConfig(getState))
        .then(res => {
            dispatch({type: BOARD_LOADED})
        })
        .catch(err => {
            dispatch(returnError(err.response.data.msg, err.response.status, "BOARD_ERROR"))
            dispatch({type: BOARD_LOADED})
        })
}
export const deleteBoard = () => (dispatch, getState) => {
    dispatch(clearError())
    dispatch({type: BOARD_LOADING})
    const boardID = getState().boards.board.boardID

    axios.delete(`/api/boards/myboards/:${boardID}`, tokenConfig(getState))
        .then(res => {
            dispatch({type: DELETE_BOARD})
            dispatch({type: BOARD_LOADED})
        })
        .catch(err => {
            dispatch(returnError(err.response.data.msg, err.response.status, "BOARD_ERROR"))
            dispatch({type: BOARD_LOADED})
        })
}
const tokenConfig = getState => {
    const token = getState().auth.token

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if(token) {
        config.headers = {
            "Content-type": "application/json",
            "x-auth-token": token
        }
    }

    return config
}