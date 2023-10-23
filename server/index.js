const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { pbkdf2Sync } = require('node:crypto');

const instrutorRoutes = require('./routes/InstructorRoutes');

const db = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use('/instructor', instrutorRoutes);

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

app.post('/login', (req, res) => {

  const q = "SELECT * FROM usu_usuario WHERE usu_email = ?";
  db.query(q, req.body.email, (err, result) => {
    if(err) {
      res.statusCode = 400;
      return res.json(err);
    }

    if(!result[0]) {
      res.statusCode = 400;
      return res.json();
    }

    const hash = pbkdf2Sync(req.body.senha, '10', 1000, 32, 'sha512').toString('hex');

    if(hash !== result[0]['usu_senha']) {
      res.statusCode = 400;
      return res.json();
    } 

    function usrType() {
      switch(result[0]['usu_tipo']) {
        case 'estudante':
          return {
            id: result[0]['usu_id'],
            email: result[0]['usu_email'],
            nome: result[0]['usu_nome'],
            tipo: result[0]['usu_tipo'],
            experiencia: result[0]['usu_experiencia'],
            nivel: result[0]['usu_nivel']
          }
  
        case 'instrutor':
          return {
            id: result[0]['usu_id'],
            email: result[0]['usu_email'],
            nome: result[0]['usu_nome'],
            tipo: result[0]['usu_tipo']
          }
  
        case 'admin':
          return {
            id: result[0]['usu_id'],
            email: result[0]['usu_email'],
            nome: result[0]['usu_nome'],
            tipo: result[0]['usu_tipo']
          }
      }
    }

    const token = jwt.sign({
      id: result[0]['usu_id'],
      tipo: result[0]['usu_tipo']
    }, 'jkey')

    const user = usrType();

    res.cookie('token', token);

    return res.json(user);

  })

});

app.get('/logout', (req, res) => {
  res.clearCookie("token");

  return res.json('Deslogado com sucesso!')
})



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
