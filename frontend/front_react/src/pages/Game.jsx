import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useManageGame from "../hooks/useManageGame";
import Confetti from "react-confetti";
import Dice from "react-dice-roll";

export default function Game() {
  const { id } = useParams();
  const { getGame, getPlayers, nextTurn } = useManageGame();
  const [gameDetails, setGameDetails] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [message, setMessage] = useState("");
  const [diceRollCount, setDiceRollCount] = useState(1);
  const [diceResults, setDiceResults] = useState([]);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const details = await getGame(id);
        setGameDetails(details);
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

  const handleDiceRoll = (values) => {
    if (gameOver) return;
    const updatedPlayers = [...players];
    const currentPlayer = updatedPlayers[currentPlayerIndex];

    const scoreIncrement = values.reduce((total, value) => total + value, 0);
    currentPlayer.score += scoreIncrement;

    if (currentPlayer.score > 21) {
      currentPlayer.busted = true;
      setPlayers(updatedPlayers);
      setDiceResults(values);
      passTurn();
    } else if (currentPlayer.score === 21) {
      setDiceResults(values);
      passTurn();
    } else {
      setPlayers(updatedPlayers);
      setDiceResults(values);
    }
  };

  const passTurn = async () => {
    const updatedPlayers = [...players];
    const currentPlayer = updatedPlayers[currentPlayerIndex];
    currentPlayer.finished = true;
    setPlayers(updatedPlayers);

    if (currentPlayerIndex === players.length - 1) {
      setGameOver(true);
      determineWinner();
    } else {
      const nextPlayerIndex = currentPlayerIndex + 1;
      setCurrentPlayerIndex(nextPlayerIndex);
    }
  };

  const determineWinner = () => {
    let winner = null;
    let highestScore = 0;
    let winners = [];

    players.forEach((player) => {
      if (!player.busted && player.score <= 21 && player.score > highestScore) {
        winner = player;
        highestScore = player.score;
        winners = [player];
      } else if (player.score === highestScore && !player.busted) {
        winners.push(player);
      }
    });

    if (winners.length > 0) {
      setMessage(
        `${winners.map((player) => player.name).join(", ")} a gagné !`
      );
      setShowConfetti(true);
    } else {
      setMessage("Match nul ! Aucun gagnant.");
    }
  };

  const handleDiceCountChange = (e) => {
    setDiceRollCount(Number(e.target.value));
    setDiceResults([]);
  };

  if (!gameDetails || players.length === 0)
    return <h1 className="text-white">Game or Players not found.</h1>;

  return (
    <div className="p-6 text-white flex flex-col items-center">
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
          <label htmlFor="diceCount" className="mr-2">
            Nombre de dés :{" "}
          </label>
          <input
            id="diceCount"
            type="number"
            min="1"
            max="3"
            value={diceRollCount}
            onChange={handleDiceCountChange}
            className="w-20 text-center border px-2 py-1"
          />
        </div>

        <div className="mt-4 flex justify-center">
          {Array.from({ length: diceRollCount }).map((_, index) => (
            <Dice
              key={index}
              faceBg="transparent"
              size={60}
              rollingTime={500}
              onRoll={(value) => handleDiceRoll([value])}
              disabled={gameOver}
            />
          ))}
        </div>

        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={passTurn}
            className="px-4 py-2 font-semibold text-white bg-black rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            disabled={gameOver}
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
        <div className="mt-4 text-center text-lg font-semibold text-gray-700 dark:text-gray-300"></div>
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
