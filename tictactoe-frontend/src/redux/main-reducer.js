import * as axios from 'axios'
import { toFilterBoardArray } from '../utils';

const SET_CELLS_COUNT = "SET_CELLS_COUNT";
const SET_TURN = "SET_TURN";
const SET_FOR_SIGN_IN = "SET_FOR_SIGN_IN";

const initialState = {
    cellsArray: null,
    turn: null,
    isAuth: false,
    seconds: null
};

export const mainReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CELLS_COUNT:
            return {
                ...state,
                cellsArray: action.cellsArray
            }
        case SET_TURN: 
            return {
                ...state,
                turn: action.turn
            }
        case SET_FOR_SIGN_IN: 
            return {
                ...state,
                isAuth: action.isAuth
            }
        default:
            return state;
    }
}

export const setCellsAC = (cellsArray) => ({type: SET_CELLS_COUNT, cellsArray})
export const setForSignInAC = (isAuth) => ({type: SET_FOR_SIGN_IN, isAuth})
export const setTurnAC = (turn) => ({type: SET_TURN, turn})


// export const getBoardData = () => {
//     return (dispatch) => {
//         axios.get(`${process.env.REACT_APP_WS_HOST}/board`).then(res => {
//             if (res.data.boardArray) {
//                 dispatch(setCellsAC(toFilterBoardArray(res.data.boardArray)))
//             }
//         })
        
//     }
// }   



