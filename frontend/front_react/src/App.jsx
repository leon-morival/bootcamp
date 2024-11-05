import "./App.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import DisplayGames from "./pages/DisplayGames";
import ModifyGame from "./pages/ModifyGame";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <nav className=" p-4 shadow-md ">
        <ul className="flex space-x-4">
          <li>
            <button
              onClick={() => navigate("/")}
              className="text-black  px-3 py-2 rounded"
            >
              Home
            </button>
          </li>
          <li>
            <Link to="/displayGames" className="text-black px-3 py-2 rounded">
              Display Games
            </Link>
          </li>
          <li>
            <Link to="/modifyGame" className="text-black px-3 py-2 rounded">
              Modify Game
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/displayGames" element={<DisplayGames />} />
        <Route path="/modifyGame" element={<ModifyGame />} />
      </Routes>
    </>
  );
}

export default App;
