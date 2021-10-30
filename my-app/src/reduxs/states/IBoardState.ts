import {SquareState} from "../../model"

export default interface IBoardState {
    myBoardInfo: SquareState[];
    opponentBoardInfo: SquareState[];
}