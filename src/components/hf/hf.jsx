import React from 'react';
import "./hf.css"

const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <a href="/dashboard">Home</a>
        <a href="/registeruser">Register User</a>
        <a href="/registeradmin">Register Admin</a>
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
