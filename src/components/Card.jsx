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
                    <img src={card.image} alt="Card" className="card-image" />
                ) : (
                    <span>?</span> // Display a placeholder when the card is not flipped
                )}
            </div>
        </div>
    );
};

export default Card;
