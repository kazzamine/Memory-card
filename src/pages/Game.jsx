import React, { useState, useEffect } from 'react';
import GameBoard from '../components/GameBoard';
import '../styles/Game.css';
import Timer from '../components/Timer';
import ScoreBoard from '../components/ScoreBoard';
import Confetti from 'react-confetti';

const generateCards = (numCards) => {
    const values = Array.from({ length: numCards / 2 }, (_, i) => String.fromCharCode(65 + i));
    const cards = [...values, ...values].map((value) => ({
        value,
        isFlipped: false,
        isMatched: false,
    }));
    return cards.sort(() => Math.random() - 0.5); // Shuffle cards
};

const Game = ({ settings }) => {
    const [cards, setCards] = useState(generateCards(settings.numCards));
    const [selectedCards, setSelectedCards] = useState([]);
    const [score, setScore] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isGameActive, setIsGameActive] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [resetTimer, setResetTimer] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Reset game when settings change
        setCards(generateCards(settings.numCards));
        setScore(0);
        setElapsedTime(0);
        setIsGameActive(false);
        setHasStarted(false);
        setShowPopup(false);
    }, [settings]);

    const handleCardFlip = (index) => {
        if (!isGameActive || cards[index].isFlipped || cards[index].isMatched) return;

        const newCards = cards.map((card, i) =>
            i === index ? { ...card, isFlipped: true } : card
        );

        const newSelected = [...selectedCards, index];
        setSelectedCards(newSelected);

        if (newSelected.length === 2) {
            const [first, second] = newSelected;
            if (newCards[first].value === newCards[second].value) {
                // Match found
                newCards[first].isMatched = true;
                newCards[second].isMatched = true;
                setScore((prevScore) => prevScore + 10);
            } else {
                // No match, flip cards back
                setTimeout(() => {
                    setCards((prevCards) =>
                        prevCards.map((card, i) =>
                            i === first || i === second ? { ...card, isFlipped: false } : card
                        )
                    );
                }, 1000);
            }
            setSelectedCards([]);
        }

        setCards(newCards);

        // Check if all cards are matched
        if (newCards.every((card) => card.isMatched)) {
            setIsGameActive(false);
            setShowPopup(true); // Show popup when all cards are matched

            // Save game result to localStorage
            const gameResult = {
                score,
                time: `${elapsedTime} seconds`,
                date: new Date().toLocaleString(), // Optional: Add date
            };

            const gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
            localStorage.setItem('gameHistory', JSON.stringify([...gameHistory, gameResult]));
        }
    };

    const startGame = () => {
        setHasStarted(true);
        setIsGameActive(true);
        setCards(generateCards(settings.numCards));
        setScore(0);
        setElapsedTime(0);
        setResetTimer((prev) => !prev);
        setShowPopup(false); // Reset popup on a new game
    };

    const closePopup = () => {
        setShowPopup(false);
        setHasStarted(false); // Reset to show "Start Game" button
    };

    return (
        <div className="game" style={{ backgroundColor: settings.background }}>
            {!hasStarted ? (
                <div className="start-game">
                    <button className="start-button" onClick={startGame}>
                        Start Game
                    </button>
                </div>
            ) : (
                <>
                    <h2>Game Board</h2>
                    <div className="game-info">
                        <Timer
                            isGameActive={isGameActive}
                            reset={resetTimer}
                            onTimeUpdate={setElapsedTime}
                        />
                        <ScoreBoard score={score} />
                    </div>
                    <GameBoard cards={cards} onCardFlip={handleCardFlip} />
                </>
            )}

            {showPopup && (
                <>
                    <Confetti width={window.innerWidth} height={window.innerHeight} />
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Congratulations! 🎉</h3>
                            <p>You completed the game in {elapsedTime} seconds with a score of {score}!</p>
                            <button className="restart-button" onClick={startGame}>
                                Play Again
                            </button>
                            <button className="close-button" onClick={closePopup}>
                                Close
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Game;
