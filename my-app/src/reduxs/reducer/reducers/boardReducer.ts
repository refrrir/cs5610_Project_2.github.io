import { Action, constant, IBoardState } from "../../../reduxs";
import { SquareState } from "../../../model";

const defaultState: IBoardState = {
    myBoardInfo: new Array(10).fill(new Array(10).fill(SquareState.None)),
    opponentBoardInfo: new Array(10).fill(new Array(10).fill(SquareState.HasShip)),
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