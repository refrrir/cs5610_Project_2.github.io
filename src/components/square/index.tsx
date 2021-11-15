import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BoardType, Position, SquareState } from "../../model";
import { Action, IBoardState, BoardActionCreator, IAppState } from '../../reduxs';
import explosion from "../../resource/explosion-svgrepo-com.svg";
import emptyHit from "../../resource/water-svgrepo-com.svg"
import "./index.css";

interface ISquareStateFromProps {
    winner?: BoardType;
}


const mapStateToProps: ((state: IAppState) => ISquareStateFromProps) = ({ board }) => {
    return {
        ...board
    };
};


type ISquareDispatchFromProps = {
    setBoardState?: (key: keyof IBoardState, value: Position) => Action;
}

const mapDispatchToProps: ((dispatch: any) => ISquareDispatchFromProps) = (dispatch: any) => {
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

type ISquareProps = ISquareOwnProps & ISquareDispatchFromProps & ISquareStateFromProps;

@(connect(mapStateToProps, mapDispatchToProps) as any)
export class Square extends React.Component<ISquareProps, ISquareState> {

    render() {
        const { state, winner } = this.props;
        let stateClass = "";
        switch (state) {
            case SquareState.Damaged:
                stateClass = "square-damaged";
                break;
            case SquareState.HasShip:
                stateClass = "square-hasShip";
                break;
            case SquareState.HasShipDamaged:
                stateClass = "square-hasShipDamaged";
        }
        if(winner !== BoardType.NULL){
            stateClass += " square-disable";
        }
        return <div className={"square " + stateClass} onClick={winner === BoardType.NULL ? this.onSquareClick : () => { }}>
            {state === SquareState.HasShipDamaged && <img src={explosion} />}
            {state === SquareState.Damaged && <img src={emptyHit} />}
        </div>
    }

    private onSquareClick: () => void = () => {
        const { setBoardState, position, type } = this.props;
        if (type === BoardType.OPPONENT) {
            setBoardState!("opponentBoardInfo", { x: position.x, y: position.y });
        }
    }

}