import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators, Action } from "redux";
import { Button } from '../../components';
import { BoardActionCreator, IAppState, PanelActionCreator } from "../../reduxs";
import { panelStep, PlayMode } from '../../model';

import "./index.css";



type IPanelDispatchFromProps = {
    setMode?: (value: PlayMode) => Action;
    setPanelState?: (key: string, value: any) => Action;
}

const mapDispatchToProps: ((dispatch: any) => IPanelDispatchFromProps) = (dispatch: any) => {
    return bindActionCreators({
        setMode: BoardActionCreator.setMode,
        setPanelState: PanelActionCreator.setValue
    }, dispatch);
}

type IPanelStateFromProps = {
    state?: panelStep;
    initial?: boolean;
}


const mapStateToProps: ((state: IAppState) => IPanelStateFromProps) = ({ panel }) => {
    return {
        ...panel
    };
};


type IPanelProps = IPanelDispatchFromProps & IPanelStateFromProps;

@(connect(mapStateToProps, mapDispatchToProps) as any)
export class Panel extends React.Component<IPanelProps, any>{

    constructor(props: IPanelProps) {
        super(props);
    }

    render() {
        const { state } = this.props;
        return state === panelStep.GAMESTART ?
            <React.Fragment />
            : <div className="panel-wrapper">
                <div className="panel">
                    {
                        state === panelStep.RULE
                            ? this.onRenderRule()
                            : this.onRenderModelSelection()
                    }
                </div>
            </div>
    }

    onRenderRule(): JSX.Element {
        const { setPanelState, initial } = this.props;
        return <React.Fragment>
            <div className="panel-title">Welcome to Battleship!</div>
            <div className="panel-text">
                Battleship is a strategy type guessing game for two players. It is played on ruled grids (paper or board) on which each player's fleet of ships (including battleships) are marked. The locations of the fleets are concealed from the other player. Players alternate turns calling "shots" at the other player's ships, and the objective of the game is to destroy the opposing player's fleet.
            </div>
            <div className="panel-button">
                <Button text={"Got it!"} onClick={() => {
                    setPanelState!("state", !initial ? panelStep.GAMESTART : panelStep.MODESELECTION);
                    setPanelState!("initial", false);
                }
                } />
            </div>
        </React.Fragment>
    }

    onRenderModelSelection(): JSX.Element {
        const { setMode, setPanelState } = this.props;
        return <React.Fragment>
            <div className="panel-title">Please select your game mode</div>
            <div style={{ display: "flex" }}>
                <div className="mode-wrapper">
                    <Button text={"Normal"} onClick={() => {
                        setPanelState!("state", panelStep.GAMESTART);
                        setMode!(PlayMode.NORMAL);
                    }}/>
                </div>
                <div className="mode-wrapper">
                    <Button text={"Freeplay"} onClick={() => {
                        setPanelState!("state", panelStep.GAMESTART);
                        setMode!(PlayMode.SINGLE);
                    }} />
                </div>
            </div>
        </React.Fragment>

    }
}