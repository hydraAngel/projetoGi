import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  return (
    <div class="nav">
      <input type="checkbox" id="nav-check"></input>
      <div class="nav-header">
        <div class="nav-title">
          STG
        </div>
      </div>
      <div class="nav-btn">
        <label for="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      
      <div class="nav-links">
        <Link to="/" >Home</Link>
        <Link to="/boletim" >Boletim</Link>
        <Link to="/alunos" >Alunos</Link>
        {/* <Link to="https://in.linkedin.com/in/jonesvinothjoseph" >LinkedIn</Link> */}
        {/* <Link to="https://codepen.io/jo_Geek/" >Codepen</Link> */}
        {/* <Link to="https://jsfiddle.net/user/jo_Geek/" >JsFiddle</Link> */}
      </div>
    </div>
  );
}

export default Navbar;
