import React from 'react';
import { Alert } from "react-bootstrap";

const AlertController = (props) => {
    const { label, variant, setShow } = props;

    return (
        <Alert variant={ variant || "danger" } onClose={setShow} dismissible>
            <Alert.Heading>{ label }</Alert.Heading>
        </Alert>
    );
};

export default AlertController;
