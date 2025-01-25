import React, { useState, useEffect } from 'react';
import GameBoard from '../components/GameBoard';
import '../styles/Game.css';
import Timer from '../components/Timer';
import ScoreBoard from '../components/ScoreBoard';
import Confetti from 'react-confetti';

import img1 from '../assets/animals/animal_1.png';
import img2 from '../assets/animals/animal_2.png';
import img3 from '../assets/animals/animal_3.png';
import img4 from '../assets/animals/animal_4.png';
import img5 from '../assets/animals/animal_5.png';
import img6 from '../assets/animals/animal_6.png';
import img7 from '../assets/animals/animal_7.png';
import img8 from '../assets/animals/animal_8.png';
import img9 from '../assets/animals/animal_9.png';
import img10 from '../assets/animals/animal_10.png';
import img11 from '../assets/animals/animal_11.png';
import img12 from '../assets/animals/animal_12.png';
import img13 from '../assets/animals/animal_13.png';
import img14 from '../assets/animals/animal_14.png';
import img15 from '../assets/animals/animal_15.png';
import img16 from '../assets/animals/animal_16.png';

const generateCards = (numCards) => {
    // Array of imported images
    const images = [
        img1, img2, img3, img4, img5, img6, img7, img8,
        img9, img10, img11, img12, img13, img14, img15, img16
    ];

    // Use only as many images as needed based on `numCards`
    const selectedImages = images.slice(0, numCards / 2);

    // Duplicate and shuffle images
    const cards = [...selectedImages, ...selectedImages].map((image, index) => ({
        id: index, // Unique identifier
        image, // Image path
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
            if (newCards[first].image === newCards[second].image) {
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
            setShowPopup(true);
    
            // Save game result to localStorage
            const gameResult = {
                score,
                time: `${elapsedTime} seconds`,
                date: new Date().toLocaleString(), 
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
        setShowPopup(false); 
    };

    const closePopup = () => {
        setShowPopup(false);
        setHasStarted(false); 
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
