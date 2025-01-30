import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import hooka do nawigacji
import { useBalance } from "../context/BalanceContext"; // Import globalnego salda
import "./DiceGame.css";

const DiceGame: React.FC = () => {
  const { balance, setBalance } = useBalance(); // Użycie kontekstu dla salda
  const [userGuess, setUserGuess] = useState<number | null>(null); // Wybrana liczba
  const [diceResult, setDiceResult] = useState<number | null>(null); // Wynik rzutu
  const [resultMessage, setResultMessage] = useState<string | null>(null); // Komunikat
  const [isRolling, setIsRolling] = useState(false); // Status animacji rzutu
  const [history, setHistory] = useState<string[]>([]); // Historia wyników
  const navigate = useNavigate(); // Hook do nawigacji

  // Obsługa zmiany wartości w input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 6) {
      setUserGuess(value);
    }
  };

  // Funkcja rzutu kością z animacją
  const rollDice = () => {
    if (userGuess === null) {
      setResultMessage("Wybierz liczbę od 1 do 6!");
      return;
    }

    if (balance < 20) {
      setResultMessage("Masz za mało środków, aby zagrać!");
      return;
    }

    // Odejmij koszt gry
    setBalance((prev) => prev - 20);

    // Rozpocznij animację rzutu
    setIsRolling(true);

    setTimeout(() => {
      const diceRoll = Math.floor(Math.random() * 6) + 1; // Losowanie liczby 1-6
      setDiceResult(diceRoll);

      if (diceRoll === userGuess) {
        const winnings = 100; // Wygrana kwota
        setBalance((prev) => prev + winnings);
        setResultMessage(`Brawo! Zgadłeś i wygrywasz $${winnings}!`);
        setHistory((prev) => [
          `Twój wybór: ${userGuess}, Wynik: ${diceRoll} – Wygrana`,
          ...prev.slice(0, 4),
        ]);
      } else {
        setResultMessage(`Przegrałeś! Wynik to ${diceRoll}.`);
        setHistory((prev) => [
          `Twój wybór: ${userGuess}, Wynik: ${diceRoll} – Przegrana`,
          ...prev.slice(0, 4),
        ]);
      }

      setIsRolling(false); // Zakończ animację
    }, 1000); // Czas trwania animacji
  };

  return (
    <div className="dice-game-container">
      {/* Przycisk powrotu */}
      <button className="back-to-home" onClick={() => navigate("/")}>
        ← Powrót do strony głównej
      </button>

      <h1>Gra w Kości</h1>
      <div className="dice-game-input">
        <label htmlFor="guess">Wybierz liczbę (1-6):</label>
        <input
          type="number"
          id="guess"
          min="1"
          max="6"
          value={userGuess || ""}
          onChange={handleInputChange}
          disabled={isRolling}
        />
      </div>
      <button onClick={rollDice} disabled={isRolling}>
        {isRolling ? "Rzucam..." : "Rzuć"}
      </button>

      {isRolling && <div className="dice-animation">🎲</div>}

      {resultMessage && <div className="dice-game-result">{resultMessage}</div>}
      <br></br>
      {diceResult !== null && !isRolling && (
        <div className="dice-game-dice">
          <p className="x">
            Wynik rzutu: <strong>{diceResult}</strong>
          </p>
        </div>
      )}
      <div className="dice-game-history">
        <h2>Historia wyników:</h2>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiceGame;
