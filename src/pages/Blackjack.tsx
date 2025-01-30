import React, { useState } from "react";
import "./Blackjack.css";

const deckTemplate = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

const getCardValue = (card: string): number => {
  if (["J", "Q", "K"].includes(card)) return 10;
  if (card === "A") return 11;
  return parseInt(card);
};

const calculateHand = (hand: string[]): number => {
  let total = hand.reduce((sum, card) => sum + getCardValue(card), 0);
  let aces = hand.filter((card) => card === "A").length;

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }
  return total;
};

const shuffleDeck = (): string[] => {
  const fullDeck = [
    ...deckTemplate,
    ...deckTemplate,
    ...deckTemplate,
    ...deckTemplate,
  ];
  return fullDeck.sort(() => Math.random() - 0.5);
};

const Blackjack: React.FC = () => {
  const [playerHand, setPlayerHand] = useState<string[]>([]);
  const [dealerHand, setDealerHand] = useState<string[]>([]);
  const [deckState, setDeckState] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const startGame = () => {
    const newDeck = shuffleDeck();
    const playerStartingHand = [newDeck[0], newDeck[1]]; // Dwie karty dla gracza
    const dealerStartingHand = [newDeck[2]]; // Jedna karta dla krupiera

    setDeckState(newDeck.slice(3)); // Pozostałe karty w talii
    setPlayerHand(playerStartingHand);
    setDealerHand(dealerStartingHand);
    setMessage(null);
    setIsGameOver(false);
  };

  const drawCard = (): string => {
    if (deckState.length === 0) {
      throw new Error("Talia kart jest pusta! Zresetuj grę.");
    }
    const [card, ...remainingDeck] = deckState;
    setDeckState(remainingDeck);
    return card;
  };

  const hit = () => {
    try {
      const newCard = drawCard();
      const newHand = [...playerHand, newCard];
      setPlayerHand(newHand);

      if (calculateHand(newHand) > 21) {
        setMessage("Przegrałeś! 😢");
        setIsGameOver(true);
      }
    } catch {
      setMessage("Błąd: Nie można dobrać karty.");
    }
  };

  const stand = () => {
    try {
      let dealerTotal = calculateHand(dealerHand);
      const dealerNewHand = [...dealerHand];

      while (dealerTotal < 17) {
        const newCard = drawCard();
        dealerNewHand.push(newCard);
        dealerTotal = calculateHand(dealerNewHand);
      }

      setDealerHand(dealerNewHand);

      const playerTotal = calculateHand(playerHand);
      if (dealerTotal > 21 || playerTotal > dealerTotal) {
        setMessage("Wygrałeś! 🎉");
      } else if (playerTotal === dealerTotal) {
        setMessage("Remis! 😐");
      } else {
        setMessage("Przegrałeś! 😢");
      }

      setIsGameOver(true);
    } catch {
      setMessage("Błąd: Nie można zakończyć.");
    }
  };

  return (
    <div className="blackjack-container">
      <h1>Blackjack</h1>
      <div className="hands">
        <div>
          <h2>Twoje karty</h2>
          <div className="hand">
            {playerHand.length > 0 ? playerHand.join(", ") : "Brak kart"}
          </div>
          <p>Suma: {playerHand.length > 0 ? calculateHand(playerHand) : 0}</p>
        </div>
        <div>
          <h2>Karty krupiera</h2>
          <div className="hand">
            {dealerHand.length > 0 ? dealerHand.join(", ") : "Brak kart"}
          </div>
          {isGameOver && <p>Suma: {calculateHand(dealerHand)}</p>}
        </div>
      </div>
      {message && <h2>{message}</h2>}
      <div className="controls">
        {!isGameOver && (
          <>
            <button onClick={hit}>Dobierz kartę</button>
            <button onClick={stand}>Zakończ</button>
          </>
        )}
        {isGameOver && <button onClick={startGame}>Nowa gra</button>}
      </div>
    </div>
  );
};

export default Blackjack;
