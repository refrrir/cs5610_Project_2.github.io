import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BoardType, PlayMode, SquareState } from "../../model";
import { Square, Button } from "../../components";
import { IAppState, BoardActionCreator, Action } from "../../reduxs";

import "./index.css";

interface IBoardStateFromProps {
    myBoardInfo?: SquareState[][];
    opponentBoardInfo?: SquareState[][];
    winner?: BoardType;
    mode?: PlayMode;
}


const mapStateToProps: ((state: IAppState) => IBoardStateFromProps) = ({ board }) => {
    return {
        ...board
    };
};


type IBoardDispatchFromProps = {
    resetBoardState?: () => Action;
}

const mapDispatchToProps: ((dispatch: any) => IBoardDispatchFromProps) = (dispatch: any) => {
    return bindActionCreators({
        resetBoardState: BoardActionCreator.initial,
    }, dispatch);
}

type IBoardProps = IBoardStateFromProps & IBoardDispatchFromProps;

@(connect(mapStateToProps, mapDispatchToProps) as any)
export class Borad extends React.Component<IBoardProps, any> {

    render() {
        const { myBoardInfo, opponentBoardInfo, winner, resetBoardState, mode } = this.props;
        const winnerString = winner === BoardType.NULL ? "" : winner === BoardType.MINE ? "Player" : "AI";
        return (
            <React.Fragment>
                <div className="winner-pannel">
                    {winner !== BoardType.NULL ? "Game over! " + winnerString + " won!" : ""}
                </div>
                <div className="button-wrapper">
                    <Button onClick={() => { resetBoardState!() }} text={"Restart!"} />
                </div>
                <div className="plate">
                    <div className="board-opponent">
                        {this.onRenderSingleBoard(BoardType.OPPONENT, opponentBoardInfo!)}
                    </div>
                    {mode === PlayMode.NORMAL && <div className="board-mine">
                        {this.onRenderSingleBoard(BoardType.MINE, myBoardInfo!)}
                    </div>}
                </div>
            </React.Fragment>
        );
    }

    private onRenderSingleBoard: (type: BoardType, info: SquareState[][]) => JSX.Element[] = (type, info) => {
        const squares = info.map((_, i) => {
            return (<div className="row">
                {info[i].map((_, j) =>
                    <Square type={type} state={info ? info[i][j] : 0} position={{ x: i, y: j }} />
                )}
            </div>)
        })
        return squares;
    }
}