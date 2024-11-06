import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useManageGame from "../hooks/useManageGame";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import Dice from "react-dice-roll"; // Importer le composant Dice

export default function Game() {
  const { id } = useParams();
  const { getGame, getPlayers, nextTurn } = useManageGame();
  const [gameDetails, setGameDetails] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // Suivi du joueur courant
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [message, setMessage] = useState(""); // Message à afficher (busted, terminé...)
  const [diceRollCount, setDiceRollCount] = useState(0); // Compteur de lancers de dés pour chaque joueur (max 3)
  const [diceResults, setDiceResults] = useState([]); // Résultats des lancers de dés

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

  const handleDiceRoll = (value) => {
    const updatedPlayers = [...players];
    const currentPlayer = updatedPlayers[currentPlayerIndex];
    currentPlayer.score += value;

    if (currentPlayer.score > 21) {
      currentPlayer.busted = true;
      setPlayers(updatedPlayers);
      setDiceResults([value]);
      passTurn();
    } else if (currentPlayer.score == 21) {
      passTurn();
    } else {
      setPlayers(updatedPlayers);
      setDiceResults([value]);
      setDiceRollCount(diceRollCount + 1);
    }
  };

  const passTurn = async () => {
    try {
      const nextTurnData = await nextTurn(id);
      if (nextTurnData.gameOver) {
        setGameOver(true);
        determineWinner();
      } else {
        setCurrentPlayerIndex(nextTurnData.nextPlayerIndex);
        setDiceRollCount(0);
      }
    } catch (error) {
      console.error("Error advancing turn:", error);
    }
  };

  const determineWinner = () => {
    let winner = null;
    let highestScore = 0;

    players.forEach((player) => {
      if (!player.busted && player.score <= 21 && player.score > highestScore) {
        winner = player;
        highestScore = player.score;
      }
    });

    if (winner) {
      // alert(`${winner.name} a gagné !`);
      setShowConfetti(true); // Déclenche l'affichage des confettis
    } else {
    }
  };

  if (!gameDetails || players.length === 0)
    return <h1 className="text-white">Game or Players not found.</h1>;

  return (
    <div className=" p-6  text-white flex flex-col items-center ">
      <h1 className="text-center text-8xl font-semibold py-5">BlackJack</h1>
      <h5 className="mb-4 mt-2 text-2xl tracking-tight text-center">
        Partie : {gameDetails.name}
      </h5>

      <div className="py-5 px-16 border-4">
        <h3 className="text-center mt-2 text-lg font-semibold dark:text-gray-300">
          ScoreBoard
        </h3>
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
                  (C'est à vous de jouer)
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Dice
            faceBg="transparent"
            size={60} // Taille du dé
            rollingTime={500} // Temps our chaque lancer de dé
            onRoll={handleDiceRoll} // Appeler handleDiceRoll avec la valeur du dé
          />
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={passTurn}
            className="px-4 py-2 font-semibold text-white bg-black rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Terminer le tour
          </button>
        </div>
      </div>

      {message && (
        <div className="mt-4 text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
          {message}
        </div>
      )}

      {gameOver && (
        <div className="mt-4 text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
          {/* La partie est terminée! */}
        </div>
      )}

      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <Link
        to="/"
        className="text-black bg-white mt-2 px-3 py-2 rounded hover:text-gray-200 hover:bg-gray-800"
      >
        Home
      </Link>
    </div>
  );
}
