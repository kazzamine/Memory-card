import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Memory Card
                </Link>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link">
                            Game
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/history" className="navbar-link">
                            History
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/settings" className="navbar-link">
                            Settings
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
