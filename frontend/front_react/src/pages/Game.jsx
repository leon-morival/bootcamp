import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useManageGame from "../hooks/useManageGame";

export default function Game() {
  const { id } = useParams();
  const { getGame, getPlayers } = useManageGame();
  const [gameDetails, setGameDetails] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // Suivi du joueur courant
  const [numDice, setNumDice] = useState(1); // Nombre de dés à lancer
  const [diceResults, setDiceResults] = useState([]); // Résultats des lancers
  const [gameOver, setGameOver] = useState(false); // Indique si la partie est finie

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const details = await getGame(id);
        if (details) {
          setGameDetails(details);
        } else {
          console.log("Erreur");
        }
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    const fetchPlayers = async () => {
      try {
        const playersData = await getPlayers(id);
        setPlayers(playersData);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchGameDetails();
    fetchPlayers();
  }, [id, getGame, getPlayers]);

  const rollDice = () => {
    // Simuler le lancer des dés
    const results = [];
    for (let i = 0; i < numDice; i++) {
      results.push(Math.floor(Math.random() * 6) + 1); // Résultat entre 1 et 6
    }

    // Mettre à jour les résultats et le score du joueur courant
    const updatedPlayers = [...players];
    const currentPlayer = updatedPlayers[currentPlayerIndex];
    const score = results.reduce((acc, value) => acc + value, 0); // Somme des dés
    currentPlayer.score += score; // Mettre à jour le score

    // Vérifier si le joueur a busté (score > 21)
    if (currentPlayer.score > 21) {
      currentPlayer.busted = true; // Marquer comme "busté"
      setPlayers(updatedPlayers);
      setDiceResults(results); // Afficher les résultats des dés
      setMessage(`${currentPlayer.name} a dépassé 21 et a perdu son tour.`);
      passTurn();
    } else {
      setPlayers(updatedPlayers);
      setDiceResults(results); // Afficher les résultats des dés
    }
  };

  const passTurn = () => {
    // Marquer le joueur actuel comme terminé
    const updatedPlayers = [...players];
    const currentPlayer = updatedPlayers[currentPlayerIndex];
    currentPlayer.finished = true; // Le joueur a terminé son tour
    setPlayers(updatedPlayers);

    // Passer au joueur suivant, ignorer les joueurs qui sont bustés ou ont terminé leur tour
    let nextPlayerIndex = currentPlayerIndex + 1;
    while (
      nextPlayerIndex < players.length &&
      (players[nextPlayerIndex].busted || players[nextPlayerIndex].finished)
    ) {
      nextPlayerIndex++;
    }

    // Si tous les joueurs ont terminé, fin de la partie
    if (nextPlayerIndex >= players.length) {
      setGameOver(true);
      determineWinner();
    } else {
      setCurrentPlayerIndex(nextPlayerIndex);
    }
  };

  const determineWinner = () => {
    // Trouver le joueur le plus proche de 21 sans dépasser
    let winner = null;
    let highestScore = 0;

    players.forEach((player) => {
      if (!player.busted && player.score <= 21 && player.score > highestScore) {
        winner = player;
        highestScore = player.score;
      }
    });

    if (winner) {
      alert(`${winner.name} a gagné avec un score de ${winner.score}!`);
    } else {
      alert("Aucun gagnant, tout le monde a busté.");
    }
  };

  const [message, setMessage] = useState(""); // Message pour affichage (gain, bust, etc.)

  if (!gameDetails || players.length === 0)
    return <h1>Game or Players not found.</h1>;

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-600 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center">
      <h1 className="text-center text-3xl font-bold">BlackJack</h1>
      <h5 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white text-center">
        Nom de la partie : {gameDetails.name}
      </h5>

      <input
        type="number"
        max="3"
        min="1"
        className="w-20 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
        placeholder="0"
        value={numDice}
        onChange={(e) => setNumDice(parseInt(e.target.value))}
      />

      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={rollDice}
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Lancer les dés
        </button>
        <button
          onClick={passTurn}
          className="px-4 py-2 font-semibold text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Terminer le tour
        </button>
      </div>

      <h3 className="text-center mt-6 text-lg font-semibold text-gray-700 dark:text-gray-300">
        ScoreBoard
      </h3>

      <div className="mt-4">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
          Players
        </h4>
        <ul className="mt-2">
          {players.map((player, index) => (
            <li key={player.id} className="text-center">
              <strong>{player.name}</strong> - Score: {player.score}
              {player.busted && (
                <span className="ml-2 text-red-500">(Busté)</span>
              )}
              {player.finished && !player.busted && (
                <span className="ml-2 text-green-500">(Terminé)</span>
              )}
              {index === currentPlayerIndex && !gameOver && (
                <span className="ml-2 text-blue-500">
                  {" "}
                  (C'est à vous de jouer)
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {message && (
        <div className="mt-4 text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
          {message}
        </div>
      )}

      {gameOver && (
        <div className="mt-4 text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
          La partie est terminée!
        </div>
      )}
    </div>
  );
}
