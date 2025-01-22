import React, { useState } from 'react';
import Card from './Card';
import '../styles/GameBoard.css';
    
const GameBoard = ({ cards, onCardFlip }) => {
    return (
        <div className="game-board">
            {cards.map((card, index) => (
                <Card
                    key={index}
                    card={card}
                    onFlip={() => onCardFlip(index)}
                />
            ))}
        </div>
    );
};

export default GameBoard;
