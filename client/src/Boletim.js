import React, { useState } from "react";
import "./Boletim.css";

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
  const getAluno = (code) => {
    document.cookie = "code=" + code;
    fetch("https://193.123.127.248:8080/alunos/" + code)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 1) {
          const as = document.querySelectorAll(".a");

          as.forEach((box) => {
            box.remove();
          });
          const br = document.querySelectorAll("br");

          br.forEach((abr) => {
            abr.remove();
          });
          const a = document.createElement("a");
          a.innerText = data[0].nome;
          a.classList.add("a");
          a.href =
            "http://193.123.127.248:10000/criarPdf?cod=" + data[0].cod_alu;
          // console.log(data[0]);
          document
            .getElementById("divBr")
            .appendChild(document.createElement("br"));

          document.getElementById("divBr").appendChild(a);
          // document.getElementById("h1").innerHTML = data[0].nome;
        } else {
          if (document.getElementsByTagName("a").length == 0) {
            for (let i = 0; i < data.length; i++) {
              const a = document.createElement("a");
              a.innerText = data[i].nome;
              a.classList.add("a");
              a.href =
                "http://193.123.127.248:10000/criarPdf?cod=" + data[i].cod_alu;
              document
                .getElementById("divBr")
                .appendChild(document.createElement("br"));

              document.getElementById("divBr").appendChild(a);
              // document.getElementById("h1").innerHTML += data[i].nome + "<br/>";
            }
          } else {
            const as = document.querySelectorAll(".a");

            as.forEach((a) => {
              a.remove();
            });

            const br = document.querySelectorAll("br");

            br.forEach((abr) => {
              abr.remove();
            });
            console.log(data.length);
            for (let i = 0; i < data.length; i++) {
              var a = document.createElement("a");
              a.innerText = data[i].nome;
              a.classList.add("a");
              a.href =
                "http://193.123.127.248:10000/criarPdf?cod=" + data[i].cod_alu;
              document
                .getElementById("divBr")
                .appendChild(document.createElement("br"));
              document.getElementById("divBr").appendChild(a);
            }
          }
          // if(document.getElementsByTagName('a'))
          // if (document.getElementById("h1").innerHTML.length === 0) {
          //   for (let i = 0; i < backendData.length; i++) {
          //     document.getElementById("h1").innerHTML += data[i].nome + "<br/>";
          //   }
          // } else {
          //   document.getElementById("h1").innerHTML = "";
          //   for (let i = 0; i < backendData.length; i++) {
          //       document.getElementById("h1").innerHTML += data[i].nome + "<br/>";
          //     }
          // }
        }
      });
  };

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
