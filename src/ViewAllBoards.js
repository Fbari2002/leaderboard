import React, {useEffect, useState} from "react";
import "./index.css";
import {db} from "./firebaseConfig";
import {
    collection,
    query,
    where,
    onSnapshot
} from "firebase/firestore";
import Board from "./Board";
import {useUserContext} from "./userContext";

const ViewBoard = () => {
    const [leaderboard, setLeaderBoard] = useState(null);
    const user = useUserContext();

    useEffect(() => {
        const fetchLeaderboard = async () => {
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
            <div className="flex justify-center items-center py-4 bg-teal-700 text-white text-2xl font-bold">
                View Leaderboard
            </div>

            <br/>

            <div>
                {leaderboard &&
                    leaderboard.map((board) => (
                        <Board key={board.id} board={board}/>
                    ))}
            </div>
        </div>
    );
};

export default ViewBoard;
