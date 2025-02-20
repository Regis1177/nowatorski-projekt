import React, { useState } from "react";
import { useBalance } from "../context/BalanceContext"; // Import kontekstu salda
import { Link } from "react-router-dom"; // Import Link do nawigacji
import "./SlotMachine.css";

const symbols = ["🍒", "🍋", "⭐", "🍉", "🔔", "7️⃣"]; // Symbole na bębnach

const SlotMachine: React.FC = () => {
  const { balance, setBalance } = useBalance(); // Użycie globalnego salda
  const [reels, setReels] = useState<string[]>(["🍒", "🍋", "⭐"]); // Początkowe symbole
  const [isSpinning, setIsSpinning] = useState(false); // Status kręcenia
  const [message, setMessage] = useState<string | null>(null); // Wynik gry

  const spinReels = () => {
    if (balance < 50) {
      setMessage("Masz za mało środków, aby zagrać!");
      return;
    }

    setBalance((prev) => prev - 50); // Odejmij koszt obrotu
    setIsSpinning(true);
    setMessage(null);

    // Przygotuj wyniki losowania
    const newReels = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
    ];

    // Uruchom animację przewijania symboli
    let currentSymbols = [...reels]; // Tymczasowe symbole do płynnego przewijania
    const intervalId = setInterval(() => {
      currentSymbols = currentSymbols.map(
        () => symbols[Math.floor(Math.random() * symbols.length)]
      );
      setReels([...currentSymbols]);
    }, 100);

    // Zatrzymaj przewijanie po określonym czasie
    setTimeout(() => {
      clearInterval(intervalId);
      setReels(newReels);
      setIsSpinning(false);

      // Sprawdź wygraną
      const isWinner =
        newReels[0] === newReels[1] && newReels[1] === newReels[2];
      if (isWinner) {
        const prize = 500; // Kwota wygranej
        setBalance((prev) => prev + prize);
        setMessage(`Jackpot! 🎉 Wygrałeś $${prize}!`);
      } else {
        setMessage("Spróbuj ponownie!");
      }
    }, 3000); // Kręci przez 3 sekundy
  };

  return (
    <div className="slot-machine-container">
      {/* Przyciski powrotu */}
      <Link to="/" className="back-button">
        ← Powrót do strony głównej
      </Link>
      <h1>Jednoręki Bandyta</h1>
      <div className={`reels ${message === "Jackpot! 🎉" ? "winner" : ""}`}>
        {reels.map((symbol, index) => (
          <div key={index} className="reel">
            {symbol}
          </div>
        ))}
      </div>
      <button onClick={spinReels} disabled={isSpinning}>
        {isSpinning ? "Kręcę..." : "Kręć"}
      </button>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default SlotMachine;
