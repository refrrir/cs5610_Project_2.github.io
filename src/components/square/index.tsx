import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { boardType } from "../../enum/boardType";
import { squareState } from "../../enum/squareState";
import Action from "../../redux/action";
import * as boardActionCreator from "../../redux/action-creator/board";
import { IBoardState } from '../../redux/states/IBoardState';
import "./index.css";

type IBoardStateFromProps = {
    setBoardState?: (key: keyof IBoardState, value: any) => Action;
}

const mapDispatchToProps: ((dispatch: any) => IBoardStateFromProps) = (dispatch: any) => {
    return bindActionCreators({
        setBoardState: boardActionCreator.setValue,
    }, dispatch);
}

export interface ISquareState {

}

export interface ISquareOwnProps {
    type: boardType;
    state: squareState;
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