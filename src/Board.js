import React from "react";
import AddPoint from "./AddPoint";
import RemovePoint from "./RemovePoint";
import FlipMove from "react-flip-move";
import {Button, Card, List, ListItem, ListItemSuffix, Typography} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
import {doc, deleteDoc} from "firebase/firestore";
import {db} from "./firebaseConfig";
import sweetAlert from 'sweetalert';

const Board = ({board}) => {
    const navigate = useNavigate();

    const calculateColor = (index, totalRows) => {
        const startColor = [128, 0, 128]; // #800080
        const endColor = [0, 128, 128]; // #008080

        const rDiff = (endColor[0] - startColor[0]) / (totalRows - 1);
        const gDiff = (endColor[1] - startColor[1]) / (totalRows - 1);
        const bDiff = (endColor[2] - startColor[2]) / (totalRows - 1);

        const r = Math.round(startColor[0] + rDiff * index);
        const g = Math.round(startColor[1] + gDiff * index);
        const b = Math.round(startColor[2] + bDiff * index);

        return `rgb(${r}, ${g}, ${b})`;
    };

    const handleOpen = () => {
        navigate('/leaderboard/createLeaderboard', {state: {board}});
    };

    const handleDelete = async () => {
        const confirmation = window.confirm("Are you sure you want to delete this leaderboard?");
        if (confirmation) {
            const boardRef = doc(db, "leaderboards", board.id);
            await deleteDoc(boardRef).then(() => {
                sweetAlert("Yay", "Your leaderboard has been deleted!!", "success");
            }).catch(error => {
                sweetAlert("Oops!", "Something went wrong!\n" + error, "error");
            })
        }
    };

    return (
        <div className="flex justify-center">
            <Card className="p-4 mb-4 shadow-md min-w-[350px] max-w-[350px]" key={board.id}>
                <List>
                    <div className="mb-4 flex flex-row items-center justify-between">
                        <Typography variant="h6" color="teal">
                            {board.leaderBoardName}
                        </Typography>

                        <div className="flex">
                            <Button onClick={handleOpen} variant="text">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="teal"
                                    className="w-6 h-6"
                                >
                                    <path
                                        d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
                                    />
                                </svg>
                            </Button>
                            <Button onClick={handleDelete} variant="text">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="maroon"
                                    className="w-6 h-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Button>
                        </div>
                    </div>

                    <FlipMove
                        duration={10000}
                        easing="ease"
                    >
                        {board.players.map((player, index) => (
                            <ListItem
                                key={player.playerName}
                                className="flex justify-between items-center"
                                style={{
                                    backgroundColor: calculateColor(index, board.players.length),
                                    color: "#fff",
                                    padding: "10px",
                                    margin: "5px",
                                }}
                            >
                                <div>
                                    <Typography variant="h6" color="white">
                                        {player.playerName}
                                    </Typography>
                                    <Typography variant="paragraph" color="white">
                                        Score: {player.playerScore}
                                    </Typography>
                                </div>

                                <ListItemSuffix className="flex space-x-4">
                                    <AddPoint player={player} board={board}/>
                                    <RemovePoint player={player} board={board}/>
                                </ListItemSuffix>
                            </ListItem>
                        ))}
                    </FlipMove>
                </List>
            </Card>
        </div>
    );
};

export default Board;
