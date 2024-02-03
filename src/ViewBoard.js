import React, {useEffect, useState} from "react";
import {Container, Table} from "react-bootstrap";
import Sidebar from "./SideBar";
import './index.css';
import {db} from "./firebaseConfig";
import {collection, query, where, getDocs} from "firebase/firestore";
import AddPoint from "./AddPoint";
import RemovePoint from "./RemovePoint";

const ViewBoard = ({user}) => {
    const [leaderboard, setLeaderBoard] = useState(null);

    const fetchLeaderboard = async () => {
        try {
            const leaderboardCollectionRef = collection(db, 'leaderboards');
            const boardQuery = query(leaderboardCollectionRef, where("userID", "==", user.email));
            const querySnapshot = await getDocs(boardQuery);

            const fetchedBoard = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            const sortedLeaderboard = fetchedBoard.map(board => ({
                ...board,
                players: board.players.sort((a, b) => b.playerScore - a.playerScore),
            }));

            setLeaderBoard(sortedLeaderboard);
        } catch (error) {
            console.error('Error retrieving board:', error);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    return (
        <div className="view-board-container">
            <Sidebar/>

            <Container fluid className="view-board-content">
                {leaderboard &&
                    leaderboard.map((board) => (
                        <div key={board.id} className="leaderboard-card">
                            <h2 className="leaderboard-name">{board.leaderBoardName}</h2>
                            <Table responsive hover variant="dark">
                                <thead>
                                <tr>
                                    <th>Player Name</th>
                                    <th>Score</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {board.players.map((player, index) => (
                                    <tr key={index} className="player-item">
                                        <td>{player.playerName}</td>
                                        <td>{player.playerScore}</td>
                                        <td><AddPoint/> <RemovePoint/></td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    ))}
            </Container>
        </div>
    );
}

export default ViewBoard;
