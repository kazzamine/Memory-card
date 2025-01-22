import React, { useState } from 'react';
import '../styles/Settings.css';

const Settings = ({ onSettingsChange,currBackground  }) => {
    const [numCards, setNumCards] = useState(4);
    const [background, setBackground] = useState(currBackground);

    const handleSaveSettings = () => {
        onSettingsChange({ numCards, background });
        alert('Settings saved!');
    };

    return (
        <div className="settings">
            <h2>Settings</h2>
            <div className="settings-option">
                <label htmlFor="numCards">Number of Cards:</label>
                <select
                    id="numCards"
                    value={numCards}
                    onChange={(e) => setNumCards(Number(e.target.value))}
                >
                    <option value={4}>4</option>
                    <option value={16}>16</option>
                    <option value={32}>32</option>
                </select>
            </div>
            <div className="settings-option">
                <label htmlFor="background">Game Background:</label>
                <input
                    id="background"
                    type="color"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                />
            </div>
            <button onClick={handleSaveSettings}>Save Settings</button>
        </div>
    );
};

export default Settings;
