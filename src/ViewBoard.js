import React, {useEffect, useState} from "react";
import Sidebar from "./SideBar";
import "./index.css";
import {db} from "./firebaseConfig";
import {
    collection,
    query,
    where,
    getDocs
} from "firebase/firestore";
import Board from "./Board";

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

    const [boards, setBoards] = useState([
        {
            'leaderBoardName': 'name',
            'players': [
                {
                    'playerName': 'test',
                    'playerScore': 5
                }, {
                    'playerName': 'test2',
                    'playerScore': 55
                }, {
                    'playerName': 'test3',
                    'playerScore': 2
                }
            ]
        }, {
            'leaderBoardName': 'name2',
            'players': [
                {
                    'playerName': 'test',
                    'playerScore': 5
                }, {
                    'playerName': 'test2',
                    'playerScore': 55
                }, {
                    'playerName': 'test3',
                    'playerScore': 2
                }
            ]
        }
    ])

    return (
        <div>
            <Sidebar/>

            <div className="flex justify-center items-center py-4 bg-teal-700 text-white text-2xl font-bold">
                View Leaderboard
            </div>

            <br/>

            <div>
                {leaderboard && leaderboard.map((board) => (
                    <Board board={board}/>
                ))}
            </div>
        </div>
    );
};

export default ViewBoard;
