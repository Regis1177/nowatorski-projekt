import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BalanceProvider } from "./context/BalanceContext";
import NavBar from "./components/NavBar";
import Crash from "./pages/Crash";
import DiceGame from "./pages/DiceGame";
import SlotMachine from "./pages/SlotMachine";

const App: React.FC = () => {
  return (
    <BalanceProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/crash" element={<Crash />} />
          <Route path="/dice-game" element={<DiceGame />} />
          <Route path="/slot-machine" element={<SlotMachine />} />
          <Route path="/" element={<></>} /> {/* Pusta strona główna */}
        </Routes>
      </Router>
    </BalanceProvider>
  );
};

export default App;
