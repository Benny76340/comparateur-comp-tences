import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Comparateur from "./pages/Comparateur";
import FichesMetiers from "./pages/FichesMetiers";
import TestSoftSkills from "./pages/TestSoftSkills";
import "./App.css";

export default function App() {
  return (
    <Router>
      {/* ✅ Navbar fixe et centrée */}
      <nav className="navbar">
        <div className="navbar-links">
          <Link to="/">Accueil</Link>
          <Link to="/comparateur">Comparateur</Link>
          <Link to="/fiches-metiers">Fiches Métiers</Link>
          <Link to="/test-soft-skills">Test Soft Skills</Link> {/* ✅ Lien ajouté */}
        </div>
      </nav>

      {/* ✅ Contenu principal */}
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/comparateur" element={<Comparateur />} />
          <Route path="/fiches-metiers" element={<FichesMetiers />} />
          <Route path="/test-soft-skills" element={<TestSoftSkills />} /> {/* ✅ Route déjà OK */}
        </Routes>
      </div>
    </Router>
  );
}
