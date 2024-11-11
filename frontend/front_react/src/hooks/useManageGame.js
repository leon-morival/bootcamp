import { useCallback } from "react";

function useManageGame() {
  const API_URL = "http://127.0.0.1:8000/api"; // URL de base de l'API

  // Fonction de configuration de fetch
  const fetchConfig = (method, body) => ({
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // Fonction pour créer une nouvelle partie
  const createGame = async (gameName, players) => {
    try {
      const response = await fetch(
        `${API_URL}/create_game`,
        fetchConfig("POST", {
          name: gameName,
          players: players,
        })
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log("Game created:", data);
      return data.id;
    } catch (error) {
      console.error("Error creating game:", error);
      return null;
    }
  };

  // Fonction pour récupérer les détails d'une partie
  const getGame = useCallback((id) => {
    return fetch(`http://127.0.0.1:8000/api/game/${id}?game_id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(
              `API error: ${errorData.message || response.statusText}`
            );
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Game details:", data);
        return data;
      })
      .catch((error) => {
        console.error("Error fetching game:", error);
      });
  }, []);

  // Fonction pour obtenir les joueurs d'une partie
  const getPlayers = useCallback(async (gameId) => {
    try {
      const response = await fetch(
        `${API_URL}/game/${gameId}/players`,
        fetchConfig("GET")
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log("Players data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching players:", error);
      return [];
    }
  }, []);

  // Fonction pour passer au tour suivant
  const nextTurn = async (gameId) => {
    try {
      const response = await fetch(
        `${API_URL}/game/${gameId}/next_turn`,
        fetchConfig("POST")
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log("Next turn data:", data);
      return data;
    } catch (error) {
      console.error("Error advancing turn:", error);
      return null;
    }
  };

  return { createGame, getGame, getPlayers, nextTurn };
}

export default useManageGame;
