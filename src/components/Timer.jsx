import React, { useEffect, useState } from 'react';

const Timer = ({ isGameActive, onGameEnd }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let timer;
        if (isGameActive) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isGameActive]);

    return <div>Time: {time} seconds</div>;
};

export default Timer;
