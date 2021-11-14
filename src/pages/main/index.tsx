import React from 'react'
import { Borad, Panel } from "../../components";

import "./index.css";

export class Main extends React.Component {
    constructor(props: any) {
        super(props);
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    render() {
        return <React.Fragment >
            <Panel />
            <Borad />
        </React.Fragment>;
    }
}