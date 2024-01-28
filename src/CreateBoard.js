import React, {useState} from "react";
import Sidebar from "./SideBar";
import Form from 'react-bootstrap/Form';
import {FloatingLabel, Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const CreateBoard = () => {
    const [inputFields, setInputFields] = useState([
        {playerName: '', playerScore: 0}
    ]);

    const [leaderBoardName, setLeaderBoardName] = useState("");

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const addFields = () => {
        let newField = {playerName: '', playerScore: 0}
        setInputFields([...inputFields, newField])
    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Process the form submission, e.g., send data to the server
        console.log(inputFields, leaderBoardName);
    };

    return (
        <div style={{backgroundColor: '#ebe6e5', minHeight: '100vh', display: 'flex'}}>
            <Sidebar/>

            <div style={{flex: 1, padding: '30px'}}>
                <Form onSubmit={handleSubmit}>
                    <h2 style={{color: '#008080', marginBottom: '30px'}}>Create Leaderboard</h2>

                    <FloatingLabel controlId="floatingInput" label="Leaderboard Name" className="mb-3">
                        <Form.Control type="text" placeholder="Enter leaderboard name" required={true}
                                      onChange={(e) => setLeaderBoardName(e.target.value)}/>
                    </FloatingLabel>

                    {inputFields.map((input, index) => (
                        <div key={index} className="mb-4" style={{marginLeft: '20px'}}>
                            <h5 style={{color: '#757575', marginBottom: '10px'}}>Player {index + 1}</h5>
                            <Row>
                                <Col>
                                    <FloatingLabel controlId={`playerName${index}`} label="Player Name">
                                        <Form.Control
                                            type="text"
                                            name="playerName"
                                            value={input.playerName}
                                            onChange={(event) => handleFormChange(index, event)}
                                            placeholder={`Enter name for Player ${index + 1}`}
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
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>

                            <Button
                                variant="outline-danger"
                                onClick={() => removeFields(index)}
                                style={{marginTop: '10px'}}
                            >Remove Player</Button>
                        </div>
                    ))}

                    <Button
                        variant="outline-secondary"
                        onClick={addFields}
                        style={{marginTop: '20px'}}
                    >Add Player</Button>

                    <Button type="submit" variant="outline-primary" style={{marginTop: '20px', marginLeft: '10px'}}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default CreateBoard;
