import React from 'react';
import { Modal, Button } from "react-bootstrap";

const ModalFooterController = (props) => {
    const { handleClose, label } = props;

    return (
        <Modal.Footer>
            <Button variant="secondary" size="sm" onClick={ handleClose }>
                {label}
            </Button>
        </Modal.Footer>
    );
};

export default ModalFooterController;