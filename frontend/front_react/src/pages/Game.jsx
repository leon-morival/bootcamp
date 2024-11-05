import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useManageGame from "../hooks/useManageGame";
export default function Game() {
  const { id } = useParams();
  const { getGame } = useManageGame();
  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const details = getGame(id);
        setGameDetails(details);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchGameDetails();
  }, [id, getGame]);

  if (!gameDetails) {
    return <h1>Game not found.</h1>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Game Details</h1>
      <p>
        <strong>ID:</strong> {gameDetails.id}
      </p>
      <p>
        <strong>Name:</strong> {gameDetails.name}
      </p>
      <p>
        <strong>Turn:</strong> {gameDetails.turn}
      </p>
      <p>
        <strong>Ended:</strong> {gameDetails.ended ? "Yes" : "No"}
      </p>
    </div>
  );
}
