import React from 'react'
import { Modal } from 'react-bootstrap'

export default ({children, show, onHide}) => {
    const wrapper = React.createRef()
    return (
        <Modal show={show} onHide={onHide} ref={wrapper} >
            <Modal.Header closeButton>
            <Modal.Title>Nuevo animal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}