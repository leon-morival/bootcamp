// hooks/useDice.js
import { useState } from "react";

const useDice = (initialPlayers) => {
  const [players, setPlayers] = useState(initialPlayers);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // Suivi du joueur courant
  const [numDice, setNumDice] = useState(1); // Nombre de dés à lancer
  const [diceResults, setDiceResults] = useState([]); // Résultats des lancers
  const [message, setMessage] = useState(""); // Message pour affichage (gain, bust, etc.)

  const rollDice = () => {
    const results = [];
    let totalScore = 0;

    // Simuler le lancer des dés
    for (let i = 0; i < numDice; i++) {
      const diceValue = Math.floor(Math.random() * 6) + 1;
      results.push(diceValue);
      totalScore += diceValue; // Ajout du score des dés
    }

    // Mettre à jour les résultats des dés
    setDiceResults(results);

    // Mettre à jour le score du joueur courant
    const updatedPlayers = [...players];
    const currentPlayer = updatedPlayers[currentPlayerIndex];
    currentPlayer.score += totalScore; // Mettre à jour le score du joueur avec la somme des dés

    setPlayers(updatedPlayers); // Mettre à jour l'état des joueurs

    // Vérifier si le joueur a gagné ou a busté
    if (currentPlayer.score === 21) {
      setMessage("Vous avez gagné ! Félicitations !");
    } else if (currentPlayer.score > 21) {
      setMessage("Vous avez dépassé 21. Tour fini.");
      // Passer au joueur suivant immédiatement
      passTurn();
    } else {
      setMessage(`Votre score actuel est ${currentPlayer.score}.`);
    }
  };

  const passTurn = () => {
    // Passer au joueur suivant
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
    setMessage(""); // Réinitialiser le message
  };

  return {
    players,
    currentPlayerIndex,
    numDice,
    diceResults,
    message,
    setNumDice,
    rollDice,
    passTurn,
  };
};

export default useDice;
