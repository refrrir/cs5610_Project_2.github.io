import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators, Action } from "redux";
import { Button } from '../../components';
import { BoardActionCreator } from "../../reduxs";
import { PlayMode } from '../../model';

import "./index.css";

enum panelStep {
    RULE = 1,
    MODESELECTION = 2,
    GAMESTART = 3,
}

type IPanelDispatchFromProps = {
    setMode?: (value: PlayMode) => Action;
}

const mapDispatchToProps: ((dispatch: any) => IPanelDispatchFromProps) = (dispatch: any) => {
    return bindActionCreators({
        setMode: BoardActionCreator.setMode,
    }, dispatch);
}

interface IPanelState {
    state: panelStep;
}

type IPanelProps = IPanelDispatchFromProps;

@(connect(null, mapDispatchToProps) as any)
export class Panel extends React.Component<IPanelProps, IPanelState>{

    constructor(props: IPanelProps) {
        super(props);
        this.state = {
            state: panelStep.RULE
        }
    }

    render() {
        const { state } = this.state;
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
        return <React.Fragment>
            <div className="panel-title">Welcome to Battleship!</div>
            <div className="panel-text">
                Battleship is a strategy type guessing game for two players. It is played on ruled grids (paper or board) on which each player's fleet of ships (including battleships) are marked. The locations of the fleets are concealed from the other player. Players alternate turns calling "shots" at the other player's ships, and the objective of the game is to destroy the opposing player's fleet.
            </div>
            <div className="panel-button">
                <Button text={"Start !"} onClick={() => this.setState({ state: panelStep.MODESELECTION })} />
            </div>
        </React.Fragment>
    }

    onRenderModelSelection(): JSX.Element {
        const {setMode} = this.props;
        return <React.Fragment>
            <div className="panel-title">Please select your game mode</div>
            <div style={{ display: "flex" }}>
                <div className="mode-wrapper">
                    <Button text={"Normal"} onClick={() => this.setState({ state: panelStep.GAMESTART })} />
                </div>
                <div className="mode-wrapper">
                    <Button text={"Freeplay"} onClick={() => {
                        this.setState({ state: panelStep.GAMESTART });
                        setMode!(PlayMode.SINGLE);
                    }}/>
                </div>
            </div>
        </React.Fragment>

    }
}