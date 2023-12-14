export function getAluno(code) {
    fetch("https://verissimos.ddnsfree.com:8080/alunos/" + code)
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

