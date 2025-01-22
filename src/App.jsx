import React,{useState} from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import Header from './layout/header';
import Footer from './layout/footer';
import Game from './pages/Game';

import Settings from './pages/Settings';
import History from './pages/History';

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



  // return (
  //   <>
  //     <Header />

  //     <Game />

  //     <Footer />
  //   </>
  // );

    return (
      <Router>
      <Header />
      <main style={{ paddingBottom: '4rem' }}>
          <Routes>
              <Route path="/" element={<Game settings={settings} />} />
              <Route
                  path="/settings"
                  element={<Settings onSettingsChange={handleSettings} />}
              />
              <Route path="/history" element={<History />} />
          </Routes>
      </main>
      <Footer />
  </Router>
    );
};

export default App;
