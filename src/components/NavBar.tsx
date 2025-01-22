import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
const NavBar: React.FC = () => {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/roulette">Ruletka</Link>
      <Link to="/crash">Crash</Link>
      <Link to="/blackjack">Blackjack</Link>
    </div>
  );
};

export default NavBar;
