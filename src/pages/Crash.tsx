import React, { useState, useEffect, useRef } from "react";
import { useBalance } from "../context/BalanceContext";
import "./Crash.css";

const Crash: React.FC = () => {
  const { balance, setBalance } = useBalance();
  const [multiplier, setMultiplier] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [history, setHistory] = useState<
    { multiplier: number; result: string }[]
  >([]);
  const [resultMessage, setResultMessage] = useState<string>("");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    if (isRunning || balance < 100) return;

    setIsRunning(true);
    setBalance((prev) => prev - 100); // Odejmij stawkę
    setMultiplier(1);
    setResultMessage("");

    let currentMultiplier = 1;

    intervalRef.current = setInterval(() => {
      currentMultiplier += 0.1; // Szybszy wzrost mnożnika
      setMultiplier(currentMultiplier);

      if (Math.random() > 0.97) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
        intervalRef.current = null;
        setIsRunning(false);
        setHistory((prev) => [
          { multiplier: currentMultiplier, result: "Przegrana" },
          ...prev,
        ]);
        setResultMessage("Przegrana!");
      }
    }, 100); // Szybsze tempo (100 ms)
  };

  const cashOut = () => {
    if (!isRunning || !intervalRef.current) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;

    const payout = Math.round(100 * multiplier);
    setBalance((prev) => prev + payout);
    setHistory((prev) => [{ multiplier, result: "Wygrana" }, ...prev]);
    setIsRunning(false);
    setResultMessage("Wygrana! Gratulacje!");
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="crash-game">
      <h1>Gra Crash</h1>
      <h2 className={`multiplier ${isRunning ? "running" : ""}`}>
        {multiplier.toFixed(2)}x
      </h2>
      {resultMessage && <p className="result-message">{resultMessage}</p>}
      <div className="actions">
        <button onClick={startGame} disabled={isRunning || balance < 100}>
          Start
        </button>
        <button onClick={cashOut} disabled={!isRunning}>
          Cash Out
        </button>
      </div>
      <h3>Historia wyników</h3>
      <ul>
        {history.map((entry, index) => (
          <li
            key={index}
            className={entry.result === "Wygrana" ? "win" : "lose"}
          >
            {entry.multiplier.toFixed(2)}x - {entry.result}
          </li>
        ))}
      </ul>
      <p>Saldo: ${balance}</p>
    </div>
  );
};

export default Crash;
