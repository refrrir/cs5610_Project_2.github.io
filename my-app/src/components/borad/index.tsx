import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BoardType, SquareState } from "../../model";
import { Square, Ship } from "../../components";
import { IAppState } from "../../reduxs";

import "./index.css";

interface IBoardStateFromProps {
    myBoardInfo?: SquareState[][];
    opponentBoardInfo?: SquareState[][];
    winner?: BoardType;
}


const mapStateToProps: ((state: IAppState) => IBoardStateFromProps) = ({ board }) => {
    return {
        ...board
    };
};


const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
    }, dispatch);
}

type IBoardState = IBoardStateFromProps;

@(connect(mapStateToProps, mapDispatchToProps) as any)
export class Borad extends React.Component<IBoardState, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const { myBoardInfo, opponentBoardInfo, winner } = this.props;
        const winnerString = winner === BoardType.NULL ? "" : winner === BoardType.MINE ?"Player" :"AI";
        return (
            <React.Fragment>
                <div className="winner-pannel">
                    {winner != BoardType.NULL ? "Game over! " + winnerString + " won!" : ""}
                </div>
                <div className="plate">
                    <div className="board-opponent">
                        {this.onRenderSingleBoard(BoardType.OPPONENT, opponentBoardInfo!)}
                    </div>
                    <div className="board-mine">
                        {this.onRenderSingleBoard(BoardType.MINE, myBoardInfo!)}
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private onRenderSingleBoard: (type: BoardType, info: SquareState[][]) => JSX.Element[] = (type, info) => {
        const squares = info.map((_, i) => {
            const left = 0;
            return (<div className="row" style={{ left: left, position: "relative" }}>
                {info[i].map((_, j) =>
                    <Square type={type} state={info ? info[i][j] : 0} position={{ x: i, y: j }} />
                )}
            </div>)
        })
        return squares;
    }
}