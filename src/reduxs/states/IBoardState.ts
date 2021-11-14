import {BoardType, PlayMode, SquareState} from "../../model"

export default interface IBoardState {
    myBoardInfo: SquareState[][];
    opponentBoardInfo: SquareState[][];
    winner: BoardType;
    mode: PlayMode;
}