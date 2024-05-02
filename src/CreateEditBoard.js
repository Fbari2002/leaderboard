import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "@material-tailwind/react";
import {db} from "./firebaseConfig";
import {addDoc, collection, doc, setDoc} from 'firebase/firestore';
import sweetAlert from 'sweetalert';

const CreateEditBoard = ({user}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {board} = location.state || {};

    const [inputFields, setInputFields] = useState([
        {playerName: '', playerScore: 0}
    ]);
    const [leaderBoardName, setLeaderBoardName] = useState("");

    useEffect(() => {
        if (board) {
            setLeaderBoardName(board.leaderBoardName);
            setInputFields(board.players);
        }
    }, [board]);

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        if (event.target.name === "playerScore") {
            data[index][event.target.name] = event.target.value === "" ? 0 : parseInt(event.target.value);
        } else {
            data[index][event.target.name] = event.target.value;
        }
        setInputFields(data);
    };

    const addFields = () => {
        let newField = {playerName: '', playerScore: 0};
        setInputFields([...inputFields, newField]);
    };

    const removeFields = (index) => {
        if (inputFields.length > 1) {
            let data = [...inputFields];
            data.splice(index, 1);
            setInputFields(data);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (inputFields.length === 0 || inputFields.every(player => player.playerName === '')) {
            sweetAlert("Oops!", "Please add at least one player");
            return;
        }

        if (board) {
            await updateLeaderboard();
        } else {
            await saveLeaderboard();
        }
    };

    const saveLeaderboard = async () => {
        try {
            await addDoc(collection(db, '/leaderboards'), {
                userID: user.email,
                leaderBoardName: leaderBoardName,
                players: inputFields
            });
            console.log('Document written');
            sweetAlert("Yay", "Your leaderboard has been created!!", "success");
            handleSuccessNavigation();
        } catch (error) {
            console.error('Error adding document', error);
            sweetAlert("Oops!", "Something went wrong!\n" + error.message, "error");
        }
    };

    const updateLeaderboard = async () => {
        try {
            await setDoc(doc(db, '/leaderboards', board.id), {
                userID: user.email,
                leaderBoardName: leaderBoardName,
                players: inputFields
            }, {merge: true});
            console.log('Document updated');
            sweetAlert("Yay", "Your leaderboard has been updated!!", "success");
            handleSuccessNavigation();
        } catch (error) {
            console.error('Error updating document', error);
            sweetAlert("Oops!", "Something went wrong!\n" + error.message, "error");
        }
    };

    const handleSuccessNavigation = () => {
        navigate('/viewBoard');
    }

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <div className="flex justify-center items-center py-4 bg-teal-700 text-white text-2xl font-bold">
                {board ? "Edit Leaderboard" : "Create Leaderboard"}
            </div>
            <div className="flex-1 p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Leaderboard Name *</label>
                        <input type="text" placeholder="Enter leaderboard name" required={true}
                               value={leaderBoardName}
                               onChange={(e) => setLeaderBoardName(e.target.value)}
                               className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {inputFields.map((input, index) => (
                        <div key={index} className="mb-4">
                            <h5 className="text-gray-700 font-bold mb-2">Player {index + 1}</h5>
                            <div className="flex">
                                <input
                                    type="text"
                                    name="playerName"
                                    value={input.playerName}
                                    onChange={(event) => handleFormChange(index, event)}
                                    placeholder={`Enter name for Player ${index + 1}`}
                                    required={true}
                                    className="border border-gray-300 rounded-md py-2 px-3 w-3/4 mr-2 focus:outline-none focus:border-blue-500"
                                />
                                <input
                                    type="number"
                                    name="playerScore"
                                    value={input.playerScore}
                                    onChange={(event) => handleFormChange(index, event)}
                                    placeholder="0"
                                    className="border border-gray-300 rounded-md py-2 px-3 w-1/4 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <Button
                                variant="gradient"
                                ripple={true}
                                onClick={() => removeFields(index)}
                                color="red"
                                className="mt-2 py-2 px-4"
                            >
                                Remove Player
                            </Button>
                        </div>
                    ))}
                    <Button
                        variant="gradient"
                        ripple={true}
                        onClick={addFields}
                        color="teal"
                        className="mt-2 py-2 px-4"
                    >
                        Add Player
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        ripple={true}
                        variant="gradient"
                        className="mt-4 py-2 px-4"
                    >
                        {board ? "Update" : "Create"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateEditBoard;