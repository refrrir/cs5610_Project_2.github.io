import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BoardType, SquareState } from "../../model";
import { Action, IBoardState, BoardActionCreator } from '../../reduxs';
import "./index.css";

type IBoardStateFromProps = {
    setBoardState?: (key: keyof IBoardState, value: any) => Action;
}

const mapDispatchToProps: ((dispatch: any) => IBoardStateFromProps) = (dispatch: any) => {
    return bindActionCreators({
        setBoardState: BoardActionCreator.setValue,
    }, dispatch);
}

export interface ISquareState {

}

export interface ISquareOwnProps {
    type: BoardType;
    state: SquareState;
}

type ISquareProps = ISquareOwnProps & IBoardStateFromProps;

@(connect(null, mapDispatchToProps) as any)
export class Square extends React.Component<ISquareProps, ISquareState> {
    constructor(props: ISquareProps) {
        super(props);
    }
    render() {
        return <div className="square" onClick={this.onSquareClick}></div>
    }

    private onSquareClick: () => void = () => {
        const { setBoardState } = this.props;
        setBoardState!("myBoardInfo", []);
    }

}