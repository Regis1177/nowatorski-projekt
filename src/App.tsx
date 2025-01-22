import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Roulette from "./pages/Roulette";
import Crash from "./pages/Crash";
import Blackjack from "./pages/Blackjack";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roulette" element={<Roulette />} />
        <Route path="/crash" element={<Crash />} />
        <Route path="/blackjack" element={<Blackjack />} />
      </Routes>
    </Router>
  );
};

export default App;
