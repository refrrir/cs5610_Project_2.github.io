import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BoardType, SquareState } from "../../model";
import { Square } from "../../components";
import {IAppState} from "../../reduxs";

import "./index.css";

interface IBoardStateFromProps {
    myBoardInfo?: SquareState[];
    opponentBoardInfo?: SquareState[];
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
        console.log(this.props.myBoardInfo);
        console.log(this.props.opponentBoardInfo);
        return (
            <div className="plate">
                <div className="board-opponent">
                    {this.onRenderSingleBoard(BoardType.OPPONENT)}
                </div>
                <div className="board-mine">
                    {this.onRenderSingleBoard(BoardType.MINE)}
                </div>
            </div>
        );
    }

    private onRenderSingleBoard: (type: BoardType) => JSX.Element[] = (type) => {

        const squares = new Array(10).fill(0).map((_, index) => {
            const left = index * 45;
            return (<div className="row" style={{ left: left, position: "relative" }}>
                {new Array(10).fill(0).map(() =>
                    <Square type={type} state={0} />
                )}
            </div>)
        })
        return squares;
    }
}