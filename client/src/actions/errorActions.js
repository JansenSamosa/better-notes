import { GET_ERROR, CLEAR_ERROR } from '../actions/types'

export const returnError = (msg, status, id) => dispatch => {
    dispatch({
        type:GET_ERROR,
        payload: {
            msg,
            status,
            id
        }
    })
}
export const clearError = () => dispatch => {
    dispatch({
        type:CLEAR_ERROR
    })
}