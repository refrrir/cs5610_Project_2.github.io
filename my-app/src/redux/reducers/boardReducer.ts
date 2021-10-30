import Action from "../action";
import constant from "../constants";
import { IBoardState } from "../states/IBoardState";
import { squareState } from "../../enum/squareState";

const defaultState: IBoardState = {
    myBoardInfo: new Array(10).fill(new Array(10).fill(squareState.None)),
    opponentBoardInfo: new Array(10).fill(new Array(10).fill(squareState.HasShip)),
};

export default (state: IBoardState = defaultState, action: Action): IBoardState => {
    const { key, value } = action;
    if (action.type === constant.UPDATE_BOARD_STATE) {
        Object.defineProperty(state, key, { value: value });
        return { ...state };
    }
    else {
        return { ...state };
    }
};