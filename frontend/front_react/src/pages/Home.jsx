import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useManageGame from "../hooks/useManageGame";
import { FaGamepad, FaUser, FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function Home() {
  const { createGame } = useManageGame();
  const navigate = useNavigate();

  // Utilisation d'un tableau pour stocker les noms des joueurs
  const [gameName, setGameName] = useState("");
  const [playerNames, setPlayerNames] = useState([""]); // Tableau pour les noms de joueurs

  // Fonction pour gérer l'ajout d'un champ de saisie supplémentaire pour un joueur
  const addPlayerInput = () => {
    setPlayerNames([...playerNames, ""]); // Ajouter un champ vide au tableau
  };

  // Fonction pour gérer le changement de valeur d'un joueur
  const handlePlayerChange = (index, value) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = value; // Mettre à jour le nom du joueur à l'index spécifié
    setPlayerNames(newPlayerNames);
  };
  const removePlayer = (id) => {
    const updatedPlayers = playerNames.filter((player) => player.id !== id);
    setPlayerNames(updatedPlayers);
  };
  const handleCreateGame = () => {
    const playersArray = playerNames.filter((name) => name.trim() !== ""); // Filtrer les joueurs vides
    createGame(gameName, playersArray).then((newGameId) => {
      if (newGameId) {
        navigate(`/game/${newGameId}`);
      } else {
        console.error("Error: Game ID not returned");
      }
    });
  };

  return (
    <div className="flex flex-col items- text-white">
      <h1 className="text-8xl font-semibold ">BlackJack</h1>
      <div className="flex flex-col items-center mt-8 space-y-4">
        {/* Champ de saisie du nom de la partie */}
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

        {/* Champs de saisie des noms des joueurs */}
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
            <button className="Delete" onClick={() => removePlayer(index)}>
              X
            </button>
          </div>
        ))}

        {/* Bouton "+" pour ajouter un joueur */}
        <button
          onClick={addPlayerInput}
          className="px-3 py-2 bg-black text-white rounded-md shadow hover:bg-gray-800 mt-2"
        >
          <FaPlus />
        </button>

        <button
          onClick={handleCreateGame}
          className="px-4 py-2 bg-black text-white rounded-none  shadow  mt-4"
        >
          Create Game
        </button>
      </div>
    </div>
  );
}
