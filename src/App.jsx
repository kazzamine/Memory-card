import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './layout/header';
import Footer from './layout/footer';
import Game from './pages/Game';
import History from './pages/History';
import Navbar from './layout/Navbar';
import SettingsModal from './components/SettingsModal';

const App = () => {
    const getSettings =
        localStorage.getItem('settings') && JSON.parse(localStorage.getItem('settings'));

    const [settings, setSettings] = useState({
        numCards: getSettings?.numCards || 4,
        background: getSettings?.background || 'linear-gradient(to bottom, #000000, #ffffff)',
        gradientStart: getSettings?.gradientStart || '#000000',
        gradientEnd: getSettings?.gradientEnd || '#ffffff',
    });

    const handleSettings = (settingsParams) => {
        localStorage.setItem('settings', JSON.stringify(settingsParams));
        setSettings(settingsParams); // Update the state with the new settings
    };

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleSettingsOpen = () => setIsSettingsOpen(true);
    const handleSettingsClose = () => setIsSettingsOpen(false);

    return (
        <div style={{ background: settings.background, minHeight: '100vh' }}>
            <Router>
                <Header />
                <Navbar onSettingsOpen={handleSettingsOpen} />
                <SettingsModal
                    isOpen={isSettingsOpen}
                    onClose={handleSettingsClose}
                    onSave={handleSettings}
                    currentSettings={settings}
                />
                <main style={{ paddingBottom: '4rem' }}>
                    <Routes>
                        <Route path="/" element={<Game settings={settings} />} />
                        <Route path="/history" element={<History />} />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </div>
    );
};

export default App;
