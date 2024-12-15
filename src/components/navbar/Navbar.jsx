import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <img src={logo} alt="Logo" />
            </div>
            <ul className="navbar__links">
                <li className={location.pathname.startsWith("/episodes") ? "active" : ""}>
                    <Link to="/episodes">
                        <span className="navbar__icon">📺</span>
                        Episodios
                    </Link>
                </li>
                <li className={location.pathname.startsWith("/characters") ? "active" : ""}>

                    <Link to="/characters">
                        <span className="navbar__icon">👤</span>
                        Personajes
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;