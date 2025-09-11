import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Battle from "./pages/Battle/Battle";
import Library from "./pages/Library/Library";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Battle" element={<Battle />} />
            <Route path="/Library" element={<Library />} />
          </Routes>
        </main>
      </Router>
      <Footer />
    </>
  );
};

export default App;
