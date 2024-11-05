import RowBj from "./RowBj";
import React from "react";
export default function TableBj({ players }) {
  return (
    <table>
      <tbody>
        {players.map((player) => (
          <RowBj key={player.id} player={player}></RowBj>
        ))}
      </tbody>
    </table>
  );
}
