import React from "react";
import AddPoint from "./AddPoint";
import RemovePoint from "./RemovePoint";
import FlipMove from "react-flip-move";
import { Card, List, ListItem, ListItemSuffix, Typography } from "@material-tailwind/react";

const Board = ({ board }) => {
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

    return (
        <div className="flex justify-center">
            <Card className="p-4 mb-4 shadow-md">
                <List key={board.id}>
                    <div className="mb-4">
                        <Typography variant="h6" color="blue-gray">
                            {board.leaderBoardName}
                        </Typography>
                    </div>

                    <FlipMove>
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
                                    <AddPoint player={player} board={board} />
                                    <RemovePoint player={player} board={board} />
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
