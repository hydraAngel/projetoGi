export function listaAlunos() {
    fetch("https://verissimos.ddnsfree.com:8080/lista")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        });
}