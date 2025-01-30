import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/dice">Kości</Link>
      <Link to="/crash">Crash</Link>
      <Link to="/slot-machine">Jednoręki Bandyta</Link>
    </nav>
  );
};

export default NavBar;
