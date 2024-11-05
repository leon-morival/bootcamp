import { useState } from "react";

import useManageGame from "../hooks/useManageGame";

export default function DisplayGames() {
  const { createGame, getGame } = useManageGame();
  const [gameId, setGameId] = useState("");

  const handleGetGame = () => {
    getGame(gameId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center mt-8 space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Game ID"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleGetGame}
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
          >
            Get Game
          </button>
        </div>
      </div>
    </div>
  );
}
