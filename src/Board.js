import React from "react";
import AddPoint from "./AddPoint";
import RemovePoint from "./RemovePoint";
import FlipMove from "react-flip-move";
import {Button, Card, List, ListItem, ListItemSuffix, Typography} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";

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

    return (
        <div className="flex justify-center">
            <Card className="p-4 mb-4 shadow-md" key={board.id}>
                <List>
                    <div className="mb-4 flex flex-row items-center justify-between">
                        <Typography variant="h6" color="teal">
                            {board.leaderBoardName}
                        </Typography>
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
