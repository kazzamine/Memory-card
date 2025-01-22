import React,{useState} from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import Header from './layout/header';
import Footer from './layout/footer';
import Game from './pages/Game';

import Settings from './pages/Settings';
import History from './pages/History';
import Navbar from './layout/Navbar';
import SettingsModal from './components/SettingsModal';
const App = () => {



    const getSettings = localStorage.getItem("settings") && JSON.parse(localStorage.getItem("settings") )

      const [settings, setSettings] = useState({
          numCards: getSettings?.numCards || 4,
          background: getSettings?.background || "#fff" ,
      });


      const handleSettings = (settingsParms) => {
      console.log(settings)
        localStorage.setItem("settings", JSON.stringify(settingsParms))

      }


      const [isSettingsOpen, setIsSettingsOpen] = useState(false);

      const handleSettingsOpen = () => setIsSettingsOpen(true);
      const handleSettingsClose = () => setIsSettingsOpen(false);


  // return (
  //   <>
  //     <Header />

  //     <Game />

  //     <Footer />
  //   </>
  // );

    return (
      <div style={{backgroundColor:settings.background}}>
      <Router>
      <Header />
      <Navbar onSettingsOpen={handleSettingsOpen} />
      <SettingsModal
                isOpen={isSettingsOpen}
                onClose={handleSettingsClose}
                onSave={setSettings}
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
