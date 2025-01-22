import React, { useState, useEffect } from 'react';

const Timer = ({ isGameActive, reset, onTimeUpdate }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let timer;
        if (isGameActive) {
            timer = setInterval(() => {
                setTime((prevTime) => {
                    const updatedTime = prevTime + 1;
                    onTimeUpdate(updatedTime); // Notify the parent component of the time
                    return updatedTime;
                });
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isGameActive]);

    // Reset the timer when the reset prop changes
    useEffect(() => {
        setTime(0);
    }, [reset]);

    return <div>Time: {time} seconds</div>;
};

export default Timer;
