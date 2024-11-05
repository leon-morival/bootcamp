import React from "react";
export default function RowBj({ player }) {
  return (
    <>
      <tr>
        <th>Name</th>
        <th>Score</th>
      </tr>

      <tr>
        <td>{player.name}</td>
        <td>{player.score}</td>
      </tr>
    </>
  );
}
