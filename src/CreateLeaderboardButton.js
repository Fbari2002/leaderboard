import React from 'react';
import styled, {keyframes} from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card';
import {useNavigate} from "react-router-dom";


const pulseAnimation = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.25);
    }
    100% {
        transform: scale(1);
    }
`;

const GradientCard = styled(Card)`
    margin-top: 30px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, #800080, #008080);
    color: white;
`;

const Button = styled.button`
    width: 100%;
    color: #fff;
    background: none;
    border: none;
    padding: 20px;
    font-size: 1.5rem;
    cursor: pointer;
    border-radius: 0 0 15px 15px;
    transition: background 0.3s ease, color 0.3s ease;

    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }

    &:hover svg {
        animation: ${pulseAnimation} 1s infinite;
    }
`;


const CreateLeaderboardButton = () => {
    const navigate = useNavigate();

    const onAdd = () => {
        navigate("/leaderboard/createLeaderboard");
    }

    return (
        <GradientCard>
            <Card.Body>
                <Button onClick={onAdd}>
                    <FontAwesomeIcon icon={faPlus} style={{marginRight: '10px'}}/>
                    Create Leaderboard
                </Button>
            </Card.Body>
        </GradientCard>
    );
};

export default CreateLeaderboardButton;
