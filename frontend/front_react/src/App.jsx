import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import Game from "./pages/Game";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Game />}></Route>
      </Routes>
    </>
  );
}

export default App;
