import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useManageGame from "../hooks/useManageGame";
import { FaGamepad, FaUser, FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function Home() {
  const { createGame } = useManageGame();
  const navigate = useNavigate();

  const [gameName, setGameName] = useState("");
  const [playerNames, setPlayerNames] = useState([""]);

  const addPlayerInput = () => {
    setPlayerNames([...playerNames, ""]);
  };

  const handlePlayerChange = (index, value) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = value;
    setPlayerNames(newPlayerNames);
  };

  const removePlayer = (index) => {
    const updatedPlayers = playerNames.filter((_, i) => i !== index);
    setPlayerNames(updatedPlayers);
  };

  const handleCreateGame = async () => {
    const playersArray = playerNames.filter((name) => name.trim() !== "");
    try {
      const newGameId = await createGame(gameName, playersArray);
      if (newGameId) {
        navigate(`/game/${newGameId}`);
      } else {
        console.error("Error: Game ID not returned");
      }
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  return (
    <div className="flex flex-col items-center text-white">
      <h1 className="text-8xl font-semibold">BlackJack</h1>
      <div className="flex flex-col items-center mt-8 space-y-4">
        <div className="flex items-center space-x-2">
          <FaGamepad className="text-white" size={30} />
          <input
            type="text"
            id="gameName"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            className="px-3 py-2 bg-black text-white border border-black rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nom de la partie"
            required
          />
        </div>

        {playerNames.map((name, index) => (
          <div key={index} className="flex items-center space-x-2">
            <FaUser className="text-white" size={27} />
            <input
              type="text"
              value={name}
              onChange={(e) => handlePlayerChange(index, e.target.value)}
              className="px-3 py-2 bg-black text-white border border-black rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Joueur ${index + 1}`}
              required
            />
            <FaXmark className="text-white" size={27} />
            <button onClick={() => removePlayer(index)} className="text-white">
              X
            </button>
          </div>
        ))}

        <button
          onClick={addPlayerInput}
          className="px-3 py-2 bg-black text-white rounded-md shadow hover:bg-gray-800 mt-2"
        >
          <FaPlus />
        </button>

        <button
          onClick={handleCreateGame}
          className="px-4 py-2 bg-black text-white rounded-none shadow mt-4"
        >
          Create Game
        </button>
      </div>
    </div>
  );
}
