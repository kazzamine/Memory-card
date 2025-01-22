import React, { useState, useEffect } from 'react';
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
    const [elapsedTime, setElapsedTime] = useState(0); // Track elapsed time
    const [isGameActive, setIsGameActive] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [showFinishMessage, setShowFinishMessage] = useState(false);
    const [resetTimer, setResetTimer] = useState(false);

    useEffect(() => {
        setCards(generateCards(settings.numCards));
        setScore(0);
        setElapsedTime(0);
        setIsGameActive(false);
        setHasStarted(false);
        setShowFinishMessage(false);
    }, [settings]);

    const handleCardFlip = (index) => {
        if (!isGameActive) return;

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
            setShowFinishMessage(true);

            // Save game result with elapsed time
            const gameResult = {
                score,
                time: elapsedTime + ' seconds', // Store the elapsed time
            };

            const gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
            localStorage.setItem('gameHistory', JSON.stringify([...gameHistory, gameResult]));
        }

        setCards(newCards);
    };

    const startGame = () => {
        setHasStarted(true);
        setIsGameActive(true);
        setShowFinishMessage(false);
        setCards(generateCards(settings.numCards));
        setScore(0);
        setElapsedTime(0); // Reset elapsed time
        setResetTimer((prev) => !prev); // Toggle reset timer to trigger reset
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
                            onTimeUpdate={setElapsedTime} // Update elapsed time
                        />
                        <ScoreBoard score={score} />
                    </div>
                    <GameBoard cards={cards} onCardFlip={handleCardFlip} />
                </>
            )}

            {showFinishMessage && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Congratulations! 🎉 You completed the game!</h3>
                        <button className="restart-button" onClick={startGame}>
                            Play Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game;
