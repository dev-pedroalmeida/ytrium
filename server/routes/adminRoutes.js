const express = require('express');
const router = express.Router();
const db = require('../db')
const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
  const token = req.cookies.token;
  if(!token) return res.status(400).json('Token inválido!');

  const decoded = jwt.verify(token, 'jkey');

  if(decoded.tipo !== 'admin') return res.status(401).json('Acesso restrito!');

  next();
}

router.get("/pendingCourses", isAuthenticated, (req, res) => {

  const q = "SELECT * FROM cur_curso WHERE cur_status='pendente'";
  db.query(q, (err, result) => {
    if(err) {
      return res.status(400).json(err);
    }

    return res.json(result);
  });
})

router.put("/publishCourse", isAuthenticated, (req, res) => {

  const q = "UPDATE cur_curso SET cur_status = ? WHERE cur_id = ?";
  db.query(q, ['publico', req.body.id], (err, result) => {
    if(err) {
      return res.status(400).json(err);
    }

    return res.json(result);
  });
})

router.post("/createCategory", isAuthenticated, (req, res) => {
  
  const q = "INSERT INTO cat_categoria (`cat_descricao`) VALUES (?)";
  db.query(q, [req.body.descricao], (err, result) => {
    if(err){
      return res.status(400).json(err);
    }
    return res.json(result);

  })
})

router.get("/categories", isAuthenticated, (req, res) => {

  const q = "SELECT * FROM cat_categoria";
  db.query(q, (err, result) => {
    if(err) {
      return res.status(400).json(err);
    }
    return res.json(result);

  })
})

router.put("/editCategory/:id", isAuthenticated, (req, res) => {

  const id = req.params.id;

  const q = `UPDATE cat_categoria SET cat_descricao = ? WHERE cat_id = ${id}`;
  db.query(q, [req.body.descricao], (err, result) => {
    if(err) {
      return res.status(400).json(err);
    }
    return res.json(result);

  })
})

router.delete("/deleteCategory/:id", isAuthenticated, (req, res) => {

  const id = req.params.id;

  const q = `DELETE FROM cat_categoria WHERE cat_id = ${id}`;
  db.query(q, (err, result) => {
    if(err) {
      return res.status(400).json(err);
    }
    return res.json(result);

  })
})

module.exports = router;