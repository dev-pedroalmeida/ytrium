const express = require('express');
const router = express.Router();
const db = require('../db')
const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
  const token = req.cookies.token;
  if(!token) return res.status(400).json('Token inválido!');

  const decoded = jwt.verify(token, 'jkey');

  if(decoded.tipo !== 'instrutor') return res.status(401).json('Acesso restrito!');

  next();
}

router.get("/courses", isAuthenticated, (req, res) => {

  const { id } = jwt.verify(req.cookies.token, 'jkey');

  const q = "SELECT * FROM cur_curso WHERE cur_instrutorId = ?";
  db.query(q, id, (err, result) => {
    if(err) {
      return res.status(400).json(err);
    }

    return res.json(result);
  });
})

module.exports = router;