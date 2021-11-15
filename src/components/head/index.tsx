import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators, Action } from "redux";
import { BoardActionCreator, PanelActionCreator } from "../../reduxs";
import { panelStep, PlayMode } from '../../model';
import { Button } from "../../components";
import { Navbar, Container, Nav } from 'react-bootstrap';

import "./index.css";


type IHeadDispatchFromProps = {
    setMode?: (value: PlayMode) => Action;
    resetBoardState?: () => Action;
    setPanelState?: (key: string, value: any) => Action;
}

const mapDispatchToProps: ((dispatch: any) => IHeadDispatchFromProps) = (dispatch: any) => {
    return bindActionCreators({
        setMode: BoardActionCreator.setMode,
        resetBoardState: BoardActionCreator.initial,
        setPanelState: PanelActionCreator.setValue
    }, dispatch);
}



type IHeadProps = IHeadDispatchFromProps;

@(connect(null, mapDispatchToProps) as any)
export class Head extends React.Component<IHeadProps, any>{

    constructor(props: IHeadProps) {
        super(props);
    }

    render() {
        const { resetBoardState, setPanelState } = this.props;
        return <Navbar bg="light" expand="lg" className="head">
            <Container>
                <Navbar.Brand className="head-title">BattleShip</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="head-link" onClick={() => setPanelState!("state", panelStep.RULE)}>
                            Rule
                        </Nav.Link>
                        <Nav.Link className="head-link" onClick={() => setPanelState!("state", panelStep.MODESELECTION)}>
                            Mode
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Button onClick={() => { resetBoardState!() }} text={"Restart!"} />
            </Container>
        </Navbar >
    }


}