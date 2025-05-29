const express = require("express");
const app = express();
const port = 5000;

const mysql = require("mysql2");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.post("/user/cadastrar", (req, res) => {
    console.log(req.body);

    // const sql = `INSERT INTO solicitante (email_solicitante)
    //                     VALUES (${email})`;

    // connection.query(sql, (erro, data) => {
    //     if (erro) {
    //         console.log(erro);
    //     } else {
    //         res.status(200);
    //         console.log("Cadastrado");
    //     }
    // })
})

    // app.post("/user/cadastrar", (req, res) => {

    //         const email = req.body.email;

    //         const sql = `INSERT INTO solicitante (email_solicitante)
    //                     VALUES (${email})`;

    //         connection.query(sql, (erro, data) => {
    //             if (erro) {
    //                 console.log(erro);
    //             } else {
    //                 res.status(200);
    //                 console.log("Cadastrado");
    //             }
    //         })
    //     }
    // )

    // conexao com o banco
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "tcc_db",
        port: "3306"
    });

    // verifica conexao
    connection.connect((erro) => {
        if (erro) {
            console.log(erro);
        }
        else {
            console.log("Conectado!");
            app.listen(port, () => {
                console.log(`Servidor rodando na porta ${port}`)
            })
        }
    })