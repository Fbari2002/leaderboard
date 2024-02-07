import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareMinus} from "@fortawesome/free-solid-svg-icons";
import {db} from "./firebaseConfig";
import {doc, updateDoc} from 'firebase/firestore';

const RemovePoint = ({player, board}) => {

    const handleRemovePoint = async () => {
        const newScore = player.playerScore - 1;
        const playerRef = doc(db, 'leaderboards', board.id);

        try {
            await updateDoc(playerRef, {
                players: board.players.map(p => {
                    if (p.playerName === player.playerName) {
                        return { ...p, playerScore: newScore };
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
        <FontAwesomeIcon
            icon={faSquareMinus}
            size="2xl"
            className="point-icon"
            onClick={handleRemovePoint}
        />
    );
};

export default RemovePoint;