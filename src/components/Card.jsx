import React from 'react';
import '../styles/Card.css';

const Card = ({ card, onFlip }) => {
    return (
        <div
            className={`card ${card.isMatched ? 'matched' : ''}`}
            onClick={!card.isFlipped && !card.isMatched ? onFlip : null}
        >
            <div className="card-content">
                {card.isFlipped || card.isMatched ? (
                    <span>{card.value}</span>
                ) : (
                    <span>?</span>
                )}
            </div>
        </div>
    );
};

export default Card;
