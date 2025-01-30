import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useBalance } from "../context/BalanceContext";
import "./NavBar.css";

const NavBar: React.FC = () => {
  const { balance } = useBalance(); // Pobierz saldo z kontekstu
  const location = useLocation();

  const hideNavBar = ["/crash", "/dice-game", "/slot-machine"].includes(
    location.pathname
  );

  return (
    <div className="navbar-container">
      <div className="navbar-balance">Saldo: ${balance}</div>
      {!hideNavBar && (
        <>
          <h1 className="navbar-title">Witamy w Kasynie!</h1>
          <p className="navbar-subtitle">
            Wybierz jedną z gier z menu nawigacyjnego powyżej, aby rozpocząć.
          </p>
          <nav className="navbar">
            <Link to="/crash">Crash</Link>
            <Link to="/dice-game">Gra w Kości</Link>
            <Link to="/slot-machine">Slot Machine</Link>
          </nav>
        </>
      )}
    </div>
  );
};

export default NavBar;
