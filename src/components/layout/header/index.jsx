import React, { useState, useEffect } from "react";
import { BiUserCircle, BiUser } from 'react-icons/bi';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './style.css';

const Header = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    }
    return (
        <div className={`header-container ${scrollPosition > 75 ? `drop-box-active` : ``}`}>
            <div className="logo-wrapper">
                <Link to="/"><p className="logo-title">Gang Green Heroes</p></Link>
            </div>
            <div className="menu-wrapper">
                <Link to="/plant_offset" className={location.pathname === '/plant_offset' ? 'active' : ''}>Plant & Offset</Link>
                <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>Projects</Link>
                <Link to="/get_involved" className={location.pathname === '/get_involved' ? 'active' : ''}>Get Involved</Link>
                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                <Link to="/community" className={location.pathname === '/community' ? 'active' : ''}>Community</Link>
                {localStorage.getItem("token") ?
                    <div className="user-info-section dropdown-wrapper">
                        <BiUserCircle />
                        <ul className={`dropdown-body-container`}>
                            <li>
                                <Link to="/profile"><BiUser />My Profile</Link>
                            </li>
                            <li onClick={() => handleLogout()}>
                                <RiLogoutBoxRLine /> Logout
                            </li>
                        </ul>
                    </div>
                    :
                    <Link to="/login" className={location.pathname === '/login' || location.pathname === '/register' ? 'active' : ''}>Login/Register</Link>}
            </div>
        </div>
    )
}

export default Header;