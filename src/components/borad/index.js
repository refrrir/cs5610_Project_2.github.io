import React from 'react';
import { Space } from "components";
import "./index.css";
export class Borad extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const spaces = new Array(10).fill(0).map((_, index) => {
            const left = index * 45;
            return (<div className="row" style={{ left: left, position: "relative" }}>
                {new Array(10).fill(0).map(() =>
                    <Space />
                )}
            </div>)
        })
        return (
            <div className="plate">
                <div className="board-opponent">
                    {spaces}
                </div>
                <div className="board-mine">
                    {spaces}
                </div>
            </div>
        );
    }
}