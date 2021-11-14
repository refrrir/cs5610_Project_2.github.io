import React from 'react';

import "./index.css";

type IButtonProps = {
    onClick: () => void;
    text: String;
}

export class Button extends React.Component<IButtonProps, any>{


    render() {
        const { onClick, text } = this.props;
        return <div className="button" onClick={onClick}>
            {text}
        </div>
    }
}