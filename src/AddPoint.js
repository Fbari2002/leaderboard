import React from "react";
import {PlusIcon} from "@heroicons/react/24/solid";
import {db} from "./firebaseConfig";
import {doc, updateDoc} from 'firebase/firestore';

const AddPoint = ({player, board}) => {

    const handleAddPoint = async () => {
        const newScore = player.playerScore + 1;
        const playerRef = doc(db, 'leaderboards', board.id);

        try {
            await updateDoc(playerRef, {
                players: board.players.map(p => {
                    if (p.playerName === player.playerName) {
                        return {...p, playerScore: newScore};
                    }
                    return p;
                })
            });
            console.log("Player's score updated successfully.");
        } catch (error) {
            console.error("Error updating player's score:", error);
        }
    }

    return (
        <PlusIcon
            className="h-5 w-5"
            onClick={handleAddPoint}
        />
    );
};

export default AddPoint;