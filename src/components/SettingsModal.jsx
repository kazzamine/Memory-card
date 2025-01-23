import React, { useState } from 'react';
import '../styles/SettingsModal.css';

const SettingsModal = ({ isOpen, onClose, onSave, currentSettings }) => {
    const [numCards, setNumCards] = useState(currentSettings.numCards);
    const [gradientStart, setGradientStart] = useState(currentSettings.gradientStart || '#000000');
    const [gradientEnd, setGradientEnd] = useState(currentSettings.gradientEnd || '#ffffff');

    const handleSave = () => {
        onSave({
            numCards,
            background: `linear-gradient(to bottom, ${gradientStart}, ${gradientEnd})`,
            gradientStart,
            gradientEnd,
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="settings-modal-overlay">
            <div className="settings-modal">
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
                    <label htmlFor="gradientStart">Gradient Start:</label>
                    <input
                        id="gradientStart"
                        type="color"
                        value={gradientStart}
                        onChange={(e) => setGradientStart(e.target.value)}
                    />
                </div>
                <div className="settings-option">
                    <label htmlFor="gradientEnd">Gradient End:</label>
                    <input
                        id="gradientEnd"
                        type="color"
                        value={gradientEnd}
                        onChange={(e) => setGradientEnd(e.target.value)}
                    />
                </div>
                <div className="settings-actions">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
