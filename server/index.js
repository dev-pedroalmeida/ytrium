const express = require("express");
const cors = require("cors");
const bcrypt = require('bcrypt');
const { pbkdf2Sync } = require('node:crypto');

const db = require("./db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`App is running!`);
});

app.post("/signup", (req, res) => {

  const hash = pbkdf2Sync(req.body.senha, '10', 1000, 32, 'sha512').toString('hex');
  
  const values = [
    req.body.nome,
    req.body.email,
    hash,
    req.body.tipo
  ]

  const q = "INSERT INTO usu_usuario (`usu_nome`, `usu_email`, `usu_senha`, `usu_tipo`) VALUES (?)";
  db.query(q, [values], (err, result) => {
    if(err) {
      res.statusCode = 400;
      return res.json(err);
    }

    return res.json(result);
  })


});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
