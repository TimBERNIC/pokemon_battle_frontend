import "./App.scss";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Battle from "./pages/Battle/Battle";
import Library from "./pages/Library/Library";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import type { BattleProps, PokemonBattleType } from "./types/types";

const App = () => {
  const [battleTab, setBattleTab] = useState<PokemonBattleType[]>([]);

  console.log(battleTab);
  return (
    <>
      <Router>
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/Battle"
              element={
                <Battle battleTab={battleTab} setBattleTab={setBattleTab} />
              }
            />
            <Route
              path="/Library"
              element={
                <Library battleTab={battleTab} setBattleTab={setBattleTab} />
              }
            />
          </Routes>
        </main>
      </Router>
      <Footer />
    </>
  );
};

export default App;
