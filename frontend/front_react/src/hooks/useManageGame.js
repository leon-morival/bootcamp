function useManageGame() {
  const createGame = (gameName, players) => {
    fetch("http://127.0.0.1:8000/api/create_game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: gameName,
        players: players,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Game created:", data);
      })
      .catch((error) => {
        console.error("Error creating game:", error);
      });
  };

  const getGame = (id) => {
    fetch(`http://127.0.0.1:8000/api/game/${id}?game_id=${id}`, {
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
      })
      .catch((error) => {
        console.error("Error fetching game:", error);
      });
  };

  // Retourne les fonctions pour qu'elles soient accessibles à l'extérieur
  return { createGame, getGame };
}

export default useManageGame;
