import React, {useEffect, useState} from "react";
import {Container, Table} from "react-bootstrap";
import Sidebar from "./SideBar";
import "./index.css";
import {db} from "./firebaseConfig";
import {
    collection,
    query,
    where,
    getDocs
} from "firebase/firestore";
import AddPoint from "./AddPoint";
import RemovePoint from "./RemovePoint";
import FlipMove from "react-flip-move";

const ViewBoard = ({user}) => {
    const [leaderboard, setLeaderBoard] = useState(null);

    const fetchLeaderboard = async () => {
        try {
            const leaderboardCollectionRef = collection(db, "leaderboards");
            const boardQuery = query(leaderboardCollectionRef, where("userID", "==", user.email));
            const querySnapshot = await getDocs(boardQuery);

            const fetchedBoard = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            const sortedLeaderboard = fetchedBoard.map((board) => ({
                ...board,
                players: board.players.sort((a, b) => b.playerScore - a.playerScore)
            }));

            setLeaderBoard(sortedLeaderboard);
        } catch (error) {
            console.error("Error retrieving board:", error);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    });

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
        <div className="view-board-container">
            <Sidebar/>

            <Container fluid className="view-board-content">
                {leaderboard &&
                    leaderboard.map((board) => (
                        <div key={board.id} className="leaderboard-card">
                            <h2 className="leaderboard-name">{board.leaderBoardName}</h2>
                            <Table className={"leaderboard-table"} responsive hover>
                                <thead>
                                    <tr>
                                        <th>Player Name</th>
                                        <th>Score</th>
                                        <th>Modifiers</th>
                                    </tr>
                                </thead>

                                <FlipMove typeName="tBody">
                                    {board.players.map((player, index) => (
                                        <tr
                                            key={player.playerName}
                                            className="player-item"
                                        >
                                            <td style={{
                                                backgroundColor: calculateColor(index, board.players.length),
                                                color: '#fff'
                                            }}>{player.playerName}</td>
                                            <td style={{
                                                backgroundColor: calculateColor(index, board.players.length),
                                                color: '#fff'
                                            }}>{player.playerScore}</td>
                                            <td style={{
                                                backgroundColor: calculateColor(index, board.players.length),
                                                color: '#fff'
                                            }}>
                                                <AddPoint player={player} board={board}/>
                                                <RemovePoint player={player} board={board}/>
                                            </td>
                                        </tr>
                                    ))}
                                </FlipMove>
                            </Table>
                        </div>
                    ))}
            </Container>
        </div>
    );
};

export default ViewBoard;
