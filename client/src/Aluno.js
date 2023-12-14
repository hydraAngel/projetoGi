import React, { useState } from "react";
import "./Aluno.css";
import { Cadastrar } from './Cadastrar.js'

function Aluno() {
  fetch("https://verissimos.ddnsfree.com:8080/lista")
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    });
  return (
    <>

    </>
  )
}

export default Aluno