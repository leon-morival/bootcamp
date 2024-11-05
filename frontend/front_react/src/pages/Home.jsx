import { useState } from "react";
import useManageGame from "../hooks/useManageGame";

export default function Home() {
  const { createGame } = useManageGame();

  // State pour le nom de la partie et les joueurs
  const [gameName, setGameName] = useState("");
  const [playerNames, setPlayerNames] = useState("");

  const handleCreateGame = () => {
    // Séparer les noms des joueurs par des virgules et les transformer en tableau
    const playersArray = playerNames.split(",").map((name) => name.trim());
    createGame(gameName, playersArray);
    setGameName("");
    setPlayerNames("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center mt-8 space-y-4">
        <label htmlFor="gameName" className="text-lg font-medium">
          Nom de la partie:
        </label>
        <input
          type="text"
          id="gameName"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label htmlFor="playerNames" className="text-lg font-medium">
          Noms des joueurs (séparés par des virgules):
        </label>
        <input
          type="text"
          id="playerNames"
          value={playerNames}
          onChange={(e) => setPlayerNames(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          onClick={handleCreateGame}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
        >
          Create Game
        </button>
      </div>
    </div>
  );
}
