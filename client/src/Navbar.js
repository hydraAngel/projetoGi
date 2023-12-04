import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"
function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/boletim">Boletim</Link>
        </li>
        <li>
          <Link to="/alunos">Alunos</Link>
        </li>
        {/* Adicione mais links conforme necessário */}
      </ul>
    </nav>
  );
}

export default Navbar;