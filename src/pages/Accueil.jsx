import React from "react";
import { Link } from "react-router-dom";
import './accueil.css';

export default function Accueil() {
  return (
    <div className="accueil-container">
      <h1 className="accueil-title">Bienvenue sur le Comparateur de Métiers</h1>
      <p className="accueil-subtitle">Choisissez une action :</p>
      <div className="accueil-buttons">
        <Link to="/comparateur">
          <button className="btn btn-primary">Comparer des métiers</button>
        </Link>
        <Link to="/fiches-metiers">
          <button className="btn btn-secondary">Voir les fiches métiers</button>
        </Link>
      </div>
    </div>
  );
}
