import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import "./index.css";
import { db } from "./firebaseConfig";
import {
    collection,
    query,
    where,
    onSnapshot
} from "firebase/firestore";
import Board from "./Board";

const ViewBoard = ({ user }) => {
    const [leaderboard, setLeaderBoard] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            console.log("fetch")
            try {
                const leaderboardCollectionRef = collection(db, "leaderboards");
                const boardQuery = query(
                    leaderboardCollectionRef,
                    where("userID", "==", user.email)
                );

                const unsubscribe = onSnapshot(boardQuery, (querySnapshot) => {
                    const fetchedBoard = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    const sortedLeaderboard = fetchedBoard.map((board) => ({
                        ...board,
                        players: board.players.sort((a, b) => b.playerScore - a.playerScore),
                    }));

                    setLeaderBoard(sortedLeaderboard);
                });

                return () => unsubscribe();
            } catch (error) {
                console.error("Error retrieving board:", error);
            }
        };

        fetchLeaderboard();
    }, [user.email]);

    return (
        <div>
            <Sidebar />

            <div className="flex justify-center items-center py-4 bg-teal-700 text-white text-2xl font-bold">
                View Leaderboard
            </div>

            <br />

            <div>
                {leaderboard &&
                    leaderboard.map((board) => (
                        <Board board={board} />
                    ))}
            </div>
        </div>
    );
};

export default ViewBoard;
