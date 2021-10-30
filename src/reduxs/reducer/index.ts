import { combineReducers } from 'redux';
import boardReducer from './reducers/boardReducer';

export default combineReducers({
    board: boardReducer,
})

export {
    boardReducer,
}