const SET_CELLS_COUNT = "SET_CELLS_COUNT";
const SET_TURN = "SET_TURN";
const SET_USERS = "SET_USERS";
const SET_FOR_SIGN_IN = "SET_FOR_SIGN_IN";
const SET_RESULT = "SET_RESULT";

const initialState = {
    cellsArray: null,
    turn: null,
    isAuth: false,
    users: [],
    result: null
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
        case SET_USERS: 
            return {
                ...state,
                users: action.users
            }
        case SET_RESULT: 
            return {
                ...state,
                result: action.result
            }
        default:
            return state;
    }
}

export const setCellsAC = (cellsArray) => ({type: SET_CELLS_COUNT, cellsArray})
export const setForSignInAC = (isAuth) => ({type: SET_FOR_SIGN_IN, isAuth})
export const setTurnAC = (turn) => ({type: SET_TURN, turn})
export const setUsersAC = (users) => ({type: SET_USERS, users})
export const setResultAC = (result) => ({type: SET_RESULT, result})


