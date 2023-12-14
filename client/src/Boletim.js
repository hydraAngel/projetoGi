import React, { useState } from "react";
import "./Boletim.css";
import { getAluno } from './GetAluno.js'

function Boletim() {
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  

  return (
    <>
      <div className="border" id="divBr">
        <input id="cod" type="text" placeholder="Código Aluno" />
        <input id="nome" type="text" placeholder="Nome Aluno" />
        <button
          onClick={() => {
            if (document.getElementById("cod").value) {
              getAluno(document.getElementById("cod").value);
            } else {
              getAluno(document.getElementById("nome").value);
            }
          }}
        >
          Pesquisar
        </button>
        <a className="a"></a>
      </div>
    </>
  );
}

export default Boletim;
