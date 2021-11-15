import { combineReducers } from 'redux';
import boardReducer from './reducers/boardReducer';
import panelReducer from './reducers/panelReducer';

export default combineReducers({
    board: boardReducer,
    panel: panelReducer
})

export {
    boardReducer,
    panelReducer
}