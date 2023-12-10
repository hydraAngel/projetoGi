const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const { log } = console;
var htp = require("html-pdf-node");


var con = mysql.createConnection({
    host: "193.123.127.248",
    user: "root",
    password: "831842",
    database: "stgcopy",
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/alunos", (req, res) => {
    con.query("SELECT * FROM alunos", function (err, result, fields) {
        if (err) throw err;
        log(result); 
        res.json(result);
    });
});

app.get("/alunos/:codAlu", (req, res) => {
    var isNum = /^\d+$/.test(req.params.codAlu);
    // log(/^\d+$/.test(req.params.codAlu))
    if (isNum) {
        con.query(
            "SELECT * FROM alunos WHERE cod_alu=" + parseInt(req.params.codAlu),
            function (err, result, fields) {
                if (err) throw err;
                log(result);
                res.json(result);
            }
        );
    } else {
        con.query(
            "SELECT * FROM alunos WHERE nome LIKE '" + req.params.codAlu + "%'",
            function (err, result, fields) {
                if (err) throw err;
                log(result);
                res.json(result);
            }
        );
    }
});

app.get("/alunos/notas/:codAlu", (req, res) => {
    con.query(
        "SELECT nome, nota, falta, cursou FROM alunota JOIN materias ON alunota.cod_mat = materias.cod_mat WHERE cod_alu=" +
            parseInt(req.params.codAlu) +
            " ORDER BY alunota.cod_mat;",
        function (err, result, fileds) {
            if (err) throw err;
            log(result);
            res.json(result);
        }
    );
});

app.listen(8080, () => {
    console.log(`Server na porta 8080 `);
});
