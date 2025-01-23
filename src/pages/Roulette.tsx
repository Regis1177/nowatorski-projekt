import React, { useState } from "react";
import "./Roulette.css";

const Roulette: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<{
    number: number;
    color: string;
  } | null>(null);
  const [translate, setTranslate] = useState(0);

  const SECTOR_WIDTH = 100; // Szerokość jednego sektora
  const TOTAL_SECTORS = 37; // Liczba sektorów w ruletce
  const REPEAT_COUNT = 7; // Powielamy sektory, aby zapewnić płynność
  const TRACK_CENTER = 300; // Środek widocznego obszaru

  // Generujemy sektory
  const sectors = Array.from({ length: TOTAL_SECTORS }).map((_, i) => ({
    number: i,
    color: i === 0 ? "green" : i % 2 === 0 ? "black" : "red",
  }));

  // Powtarzamy sektory
  const repeatedSectors = Array(REPEAT_COUNT).fill(sectors).flat();

  const spinRoulette = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    // Losowanie sektora ze środkowego powielenia
    const middleStartIndex = Math.floor((REPEAT_COUNT / 2) * TOTAL_SECTORS);
    const randomIndex =
      middleStartIndex + Math.floor(Math.random() * TOTAL_SECTORS);
    const selectedSector = repeatedSectors[randomIndex];

    // Obliczanie przesunięcia dla wyśrodkowania sektora
    const position = randomIndex * SECTOR_WIDTH;
    setTranslate(-position + TRACK_CENTER - SECTOR_WIDTH / 2);

    // Ustawienie wyniku po zakończeniu animacji
    setTimeout(() => {
      setResult(selectedSector);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="roulette-container">
      <h1>Pozioma Ruletka</h1>
      <div className="roulette-wrapper">
        <div
          className="roulette-track"
          style={{ transform: `translateX(${translate}px)` }}
        >
          {repeatedSectors.map((sector, i) => (
            <div
              key={i}
              className="roulette-sector"
              style={{ backgroundColor: sector.color }}
            >
              {sector.number}
            </div>
          ))}
        </div>
        <div className="roulette-indicator" />
      </div>
      <button onClick={spinRoulette} disabled={isSpinning}>
        {isSpinning ? "Trwa obrót..." : "Zakręć"}
      </button>
      {result && (
        <div className="roulette-result">
          <p>
            Wynik: <strong>{result.number}</strong>
          </p>
          <p>
            Kolor:{" "}
            <strong
              style={{
                color:
                  result.color === "red"
                    ? "red"
                    : result.color === "black"
                    ? "black"
                    : "green",
              }}
            >
              {result.color}
            </strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default Roulette;
