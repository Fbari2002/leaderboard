import React, { useState } from "react";
import Sidebar from "./SideBar";
import Form from 'react-bootstrap/Form';
import { FloatingLabel, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { db } from "./firebaseConfig";
import { collection, addDoc } from 'firebase/firestore';
import sweetAlert from 'sweetalert';

const CreateBoard = ({user}) => {
    const [inputFields, setInputFields] = useState([
        { playerName: '', playerScore: 0 }
    ]);

    const [leaderBoardName, setLeaderBoardName] = useState("");

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        if (event.target.name === "playerScore") {
            data[index][event.target.name] = parseInt(event.target.value);
        } else {
            data[index][event.target.name] = event.target.value;
        }
        setInputFields(data);
    }

    const addFields = () => {
        let newField = { playerName: '', playerScore: 0 }
        setInputFields([...inputFields, newField])
    }

    const removeFields = (index) => {
        if (inputFields.length > 1) {
            let data = [...inputFields];
            data.splice(index, 1);
            setInputFields(data);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (inputFields.length === 0 || inputFields.every(player => player.playerName === '')) {
            sweetAlert("Oops!", "Please add at least one player");
            return;
        }

        saveLeaderboard();
    };

    const saveLeaderboard = async () => {
        try {
            await addDoc(collection(db, '/leaderboards'), {
                userID: user.email,
                leaderBoardName: leaderBoardName,
                players: inputFields
            });
            console.log('Document written');
            sweetAlert("Yay", "Your leaderboard has been created!!", "success")
        } catch (error) {
            console.error('Error adding document', error);
            sweetAlert("Oops!", "Something went wrong!\n" + error, "error");
        }
    };

    return (
        <div style={{ backgroundColor: '#ebe6e5', minHeight: '100vh', display: 'flex' }}>
            <Sidebar />

            <div style={{ flex: 1, padding: '30px' }}>
                <Form onSubmit={handleSubmit}>
                    <h2 style={{ color: '#008080', marginBottom: '30px' }}>Create Leaderboard</h2>

                    <FloatingLabel controlId="floatingInput" label="Leaderboard Name *" className="mb-3">
                        <Form.Control type="text" placeholder="Enter leaderboard name" required={true}
                                      onChange={(e) => setLeaderBoardName(e.target.value)} />
                    </FloatingLabel>

                    {inputFields.map((input, index) => (
                        <div key={index} className="mb-4" style={{ marginLeft: '20px' }}>
                            <h5 style={{ color: '#757575', marginBottom: '10px' }}>Player {index + 1}</h5>
                            <Row>
                                <Col>
                                    <FloatingLabel controlId={`playerName${index}`} label="Player Name *" required={index === 0}>
                                        <Form.Control
                                            type="text"
                                            name="playerName"
                                            value={input.playerName}
                                            onChange={(event) => handleFormChange(index, event)}
                                            placeholder={`Enter name for Player ${index + 1}`}
                                            required={true}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel controlId={`playerScore${index}`} label="Player Starting Score">
                                        <Form.Control
                                            type="number"
                                            name="playerScore"
                                            value={input.playerScore}
                                            onChange={(event) => handleFormChange(index, event)}
                                            placeholder="0"
                                            r
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>

                            <Button
                                variant="danger"
                                onClick={() => removeFields(index)}
                                style={{ marginTop: '10px' }}
                            >Remove Player</Button>
                        </div>
                    ))}

                    <Button
                        variant="dark"
                        onClick={addFields}
                        style={{ marginTop: '20px' }}
                    >Add Player</Button>

                    <Button type="submit" variant="primary" style={{ marginTop: '20px', marginLeft: '10px' }}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default CreateBoard;
