import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import Game from "./pages/Game";
function App() {
  return (
    <>
      <nav className=" p-4 shadow-md ">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-black px-3 py-2 rounded">
              Home
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Game />}></Route>
      </Routes>
    </>
  );
}

export default App;
