import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from "./firebaseConfig";
import sweetAlert from "sweetalert";
const CustomModal = ({ isOpen, onRequestClose, children }) => {
    return (
        <Modal
            show={isOpen}
            onHide={onRequestClose}
            centered
        >
            {children}
        </Modal>
    );
};

const ModalButton = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [email, setEmail] = useState("");

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const resetPassword = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                sweetAlert("You'll be back soon", "A reset email has been sent. Please check your inbox", "success")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
                sweetAlert("Oops!", "Something went wrong!\n" + errorMessage, "error");
            });
    }

    return (
        <>
            <Button
                onClick={openModal}
                className={"btn btn-outline-light btn-sm px-4"}
                variant={"outline-light"}
            >Forgotten Password?</Button>
            <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Password Reset
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Please provide your email address</h5>
                    <p>A password reset email will be sent if account exists.</p>
                    <input
                        className="form-control form-control-md"
                        id="email-address"
                        name="email"
                        type="email"
                        required
                        placeholder="Email address"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeModal} variant="outline-dark">Cancel</Button>
                    <Button onClick={resetPassword} variant="danger">Reset</Button>
                </Modal.Footer>
            </CustomModal>
        </>
    );
};

export default ModalButton;
