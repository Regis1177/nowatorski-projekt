import React, { useState, useEffect } from "react";
import "./Crash.css";

const Crash: React.FC = () => {
  const [multiplier, setMultiplier] = useState(1.0); // Aktualny mnożnik
  const [isRunning, setIsRunning] = useState(false); // Czy gra jest w toku
  const [crashValue, setCrashValue] = useState(0); // Wartość crashowania
  const [result, setResult] = useState<string | null>(null); // Wynik gry
  const [history, setHistory] = useState<string[]>([]); // Historia wyników

  const startGame = () => {
    setIsRunning(true);
    setResult(null);
    setMultiplier(1.0);
    setCrashValue(Math.random() * 5 + 1); // Losowe crashowanie (1.0x - 6.0x)
  };

  const cashOut = () => {
    if (!isRunning) return;
    setIsRunning(false);
    const winMessage = `Wynik: ${multiplier.toFixed(2)}x - Wygrana`;
    setResult(winMessage);
    setHistory((prev) => [winMessage, ...prev]); // Dodaj wynik do historii
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setMultiplier((prev) => {
        const next = prev + 0.01;
        if (next >= crashValue) {
          // Gra crashuje
          clearInterval(interval);
          setIsRunning(false);
          const loseMessage = `Wynik: ${next.toFixed(2)}x - Przegrana`;
          setResult(loseMessage);
          setHistory((prev) => [loseMessage, ...prev]); // Dodaj wynik do historii
        }
        return next;
      });
    }, 50); // Aktualizacja co 50ms

    return () => clearInterval(interval);
  }, [isRunning, crashValue]);

  return (
    <div className="crash-container">
      <h1>Gra Crash</h1>
      <div className="crash-multiplier">
        <span>{multiplier.toFixed(2)}x</span>
      </div>
      {!isRunning ? (
        <button onClick={startGame}>Start</button>
      ) : (
        <button onClick={cashOut}>Wypłać</button>
      )}
      {result && <div className="crash-result">{result}</div>}
      <div className="crash-history">
        <h2>Historia wyników</h2>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Crash;
