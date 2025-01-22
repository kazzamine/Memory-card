import React, { useState,useEffect } from 'react';
import GameBoard from '../components/GameBoard';
import '../styles/Game.css';

import Timer from '../components/Timer';
import ScoreBoard from '../components/ScoreBoard';

const generateCards = (numCards) => {
    const values = Array.from({ length: numCards / 2 }, (_, i) => String.fromCharCode(65 + i));
    const cards = [...values, ...values].map((value) => ({
        value,
        isFlipped: false,
        isMatched: false,
    }));
    return cards.sort(() => Math.random() - 0.5);
};



const Game = ({ settings }) => {
    const [cards, setCards] = useState(generateCards(settings.numCards));
    const [selectedCards, setSelectedCards] = useState([]);
    const [score, setScore] = useState(0);
    const [isGameActive, setIsGameActive] = useState(true);

    useEffect(() => {
        setCards(generateCards(settings.numCards));
        setScore(0);
        setIsGameActive(true);
    }, [settings]);

    const handleCardFlip = (index) => {
        const newCards = cards.map((card, i) =>
            i === index ? { ...card, isFlipped: true } : card
        );
    
        const newSelected = [...selectedCards, index];
        setSelectedCards(newSelected);
    
        if (newSelected.length === 2) {
            const [first, second] = newSelected;
            if (newCards[first].value === newCards[second].value) {
                newCards[first].isMatched = true;
                newCards[second].isMatched = true;
                setScore((prevScore) => prevScore + 10);
            } else {
                setTimeout(() => {
                    setCards((prevCards) =>
                        prevCards.map((card, i) =>
                            i === first || i === second
                                ? { ...card, isFlipped: false }
                                : card
                        )
                    );
                }, 1000);
            }
            setSelectedCards([]);
        }
    
        if (newCards.every((card) => card.isMatched)) {
            setIsGameActive(false);
    
            // Save game result to localStorage
            const gameResult = {
                score,
                time: new Date().toLocaleTimeString(),
            };
    
            const gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
            localStorage.setItem('gameHistory', JSON.stringify([...gameHistory, gameResult]));
        }
    
        setCards(newCards);
    };
    

    return (
        <div className="game" style={{ backgroundColor: settings.background }}>
            <h2>Game Board</h2>
            <div className="game-info">
                <Timer isGameActive={isGameActive} />
                <ScoreBoard score={score} />
            </div>
            <GameBoard cards={cards} onCardFlip={handleCardFlip} />
        </div>
    );
};

export default Game;
