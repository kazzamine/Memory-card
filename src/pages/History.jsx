import React, { useEffect, useState } from 'react';
import '../styles/History.css';

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
        setHistory(savedHistory);
    }, []);

    const clearHistory = () => {
        localStorage.removeItem('gameHistory');
        setHistory([]);
    };

    return (
        <div className='history'>
            <h2>Game History</h2>
            {history.length > 0 ? (
                <ul>
                    {history.map((game, index) => (
                        <li key={index}>
                            Score: {game.score}, Time: {game.time}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No games played yet!</p>
            )}
            <button onClick={clearHistory}>Clear History</button>
        </div>
    );
};

export default History;
