import React, { useEffect, useState } from 'react';

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
        setHistory(savedHistory);
    }, []);

    return (
        <div>
            <h2>Game History</h2>
            <ul>
                {history.map((game, index) => (
                    <li key={index}>
                        Score: {game.score}, Time: {game.time}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default History;
