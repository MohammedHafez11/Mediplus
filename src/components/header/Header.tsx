import  { useState } from 'react';
import logo from '/public/images/logo.png';
import { Phone, Mail, Menu, X } from 'lucide-react';
import { ArrowBigDown } from 'lucide-react';
import { Link } from 'react-router-dom';


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <>
            <header className="header">
                <div className="topbar">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-5 col-12">
                                <ul className="top-link">
                                    <li><a href="#">About</a></li>
                                    <li><a href="#">Doctors</a></li>
                                    <li><a href="#">Contact</a></li>
                                    <li><a href="#">FAQ</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-6 col-md-7 col-12">
                                <ul className="top-contact">
                                    <li>
                                        <a href="#" style={{ display: "flex", alignItems: "center" }}>
                                            <Phone /> +0121 1234 56789
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto:support@gmail.com" style={{ display: "flex", alignItems: "center" }}>
                                            <Mail /> support@gmail.com
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-inner">
                    <div className="container">
                        <div className="inner">
                            <div className="row">
                                <div className="col-lg-3 col-md-3 col-12" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <div className="logo">
                                        <a href="index.html"><img src={logo} alt="#" /></a>
                                    </div>
                                    <div className="mobile-nav">
                                        <button onClick={toggleMenu} className="menu-toggle">
                                            {isMenuOpen ? <X /> : <Menu />}
                                        </button>
                                    </div>
                                </div>
                                <div className={`col-lg-7 col-md-9 col-12 ${isMenuOpen ? 'open' : ''}`}>
                                    <div className={`main-menu ${isMenuOpen ? 'open' : ''}`}>
                                        <nav className="navigation">
                                            <ul className="nav menu">
                                                <li className="active">
                                                    <Link to="/" style={{display: "flex", alignItems: "center"}}>Home <i><ArrowBigDown /></i></Link>
                                                    <ul className="dropdown">
                                                        <li><Link to="/">Home Page 1</Link></li>
                                                    </ul>
                                                </li>
                                              
                                                <li><Link to="/blogs">Blogs</Link></li>
                                                <li><Link to="/Contact">Contact Us</Link></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-12">
                                    <div className="get-quote">
                                        <a href="#appointment" className="btn">Book Appointment</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <style>{`
                .menu-toggle {
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-size: 24px;
                }

                .main-menu {
                    display: none;
                }

                .main-menu.open {
                    display: block;
                }

                @media (min-width: 900px) {
                    .menu-toggle {
                        display: none;
                    }

                    .main-menu {
                        display: block;
                    }
                }
            `}</style>
        </>
    );
}

export default Header;