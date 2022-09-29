import { applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import { mainReducer } from "./main-reducer";
import thunk from 'redux-thunk'
let rootReducer = combineReducers({   
    main: mainReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

window.store = store;

export default store