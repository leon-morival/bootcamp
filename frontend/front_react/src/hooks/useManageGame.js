import { useCallback } from "react";
function useManageGame() {
  const createGame = (gameName, players) => {
    return fetch("http://127.0.0.1:8000/api/create_game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: gameName,
        players: players,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Game created:", data);
        return data.id;
      })
      .catch((error) => {
        console.error("Error creating game:", error);
      });
  };

  const getGame = useCallback((id) => {
    return fetch(`http://127.0.0.1:8000/api/game/${id}?game_id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
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

  const getPlayers = useCallback((gameId) => {
    return fetch(`http://127.0.0.1:8000/api/game/${gameId}/players`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
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
  const nextTurn = (gameId) => {
    return fetch(`http://127.0.0.1:8000/api/game/${gameId}/next_turn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Next turn data:", data);
        return data;
      })
      .catch((error) => {
        console.error("Error advancing turn:", error);
      });
  };

  return { createGame, getGame, getPlayers, nextTurn };
}

export default useManageGame;
