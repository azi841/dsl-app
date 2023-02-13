import React from 'react';
import "./hf.css"

const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">
        Copyright &copy; {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
};

export { Header, Footer };
