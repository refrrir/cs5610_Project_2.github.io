import React from 'react';
import { Button as BootStrapButton } from 'react-bootstrap';

import "./index.css";

type IButtonProps = {
    onClick: () => void;
    text: String;
}

export class Button extends React.Component<IButtonProps, any>{


    render() {
        const { onClick, text } = this.props;
        return <BootStrapButton variant="outline-primary" className="button" onClick={onClick} color={"red"} size="lg">{text}</BootStrapButton>

    }
}