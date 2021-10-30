import {squareState} from "../../enum/squareState"

export interface IBoardState {
    myBoardInfo: squareState[];
    opponentBoardInfo: squareState[];
}