import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BoardType, Position, SquareState } from "../../model";
import { Action, IBoardState, BoardActionCreator } from '../../reduxs';
import "./index.css";


type IBoardStateFromProps = {
    setBoardState?: (key: keyof IBoardState, value: Position) => Action;
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
    position: Position;
}

type ISquareProps = ISquareOwnProps & IBoardStateFromProps;

@(connect(null, mapDispatchToProps) as any)
export class Square extends React.Component<ISquareProps, ISquareState> {
    constructor(props: ISquareProps) {
        super(props);
    }
    render() {
        const{state} = this.props;
        let stateClass = "";
        switch(state){
            case SquareState.Damaged:
                stateClass="square-damaged";
                break;
            case SquareState.HasShip:
                stateClass="square-hasShip";
                break;
            case SquareState.HasShipDamaged:
                stateClass="square-hasShipDamaged";
        }
        return <div className={"square " + stateClass} onClick={this.onSquareClick}></div>
    }

    private onSquareClick: () => void = () => {
        const { setBoardState, position, type} = this.props;
        if (type == BoardType.OPPONENT){
            setBoardState!("opponentBoardInfo", { x: position.x, y: position.y });
        }
    }

}