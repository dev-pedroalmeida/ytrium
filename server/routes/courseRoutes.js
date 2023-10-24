const express = require('express');
const router = express.Router();
const db = require('../db')

function isAuthenticated(req, res, next) {
  const token = req.cookies.token;
  if(!token) return res.status(400).json('Token inválido!');

  next();
}

router.get("/getAll", isAuthenticated, (req, res) => {

  const q = "SELECT * FROM cur_curso WHERE cur_status = ?";
  db.query(q, 'publico', (err, result) => {
    if(err) {
      return res.status(400).json(err);
    }

    return res.json(result);
  });
})

router.get("/:courseId", isAuthenticated, (req, res) => {

  const q = "SELECT * FROM cur_curso WHERE cur_id = ?";
  db.query(q, req.params.courseId, (err, result) => {
    if(err) {
      return res.status(400).json(err);
    }

    return res.json(result);
  });
})

module.exports = router;