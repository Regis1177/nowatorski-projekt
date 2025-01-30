import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blackjack from "./pages/Blackjack";
import DiceGame from "./pages/DiceGame";
import Crash from "./pages/Crash";
import SlotMachine from "./pages/SlotMachine";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blackjack" element={<Blackjack />} />
        <Route path="/dice" element={<DiceGame />} />
        <Route path="/crash" element={<Crash />} />
        <Route path="/slot-machine" element={<SlotMachine />} />
      </Routes>
    </Router>
  );
};

export default App;
