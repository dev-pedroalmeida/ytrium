const express = require('express');
const router = express.Router();
const db = require('../db')
const jwt = require('jsonwebtoken');
const multer = require('multer')
const upload = multer({dest: 'public/badges'})

function isAuthenticated(req, res, next) {
  const token = req.cookies.token;
  if(!token) return res.status(400).json('Token inválido!');

  const decoded = jwt.verify(token, 'jkey');

  if(decoded.tipo !== 'admin') return res.status(401).json('Acesso restrito!');

  next();
}

router.get("/pendingCourses", isAuthenticated, (req, res) => {

  const q = "select c.cur_id, c.cur_titulo, c.cur_status, c.cur_qtdInscritos, json_arrayagg(ca.cat_descricao) as categorias from cur_curso c inner join cct_curso_categoria cc on cc.cct_cursoId = c.cur_id inner join cat_categoria ca on cc.cct_categoriaId = ca.cat_id where c.cur_status = 'pendente' group by c.cur_id;";
  db.query(q, (err, result) => {
    if(err) {
      return res.status(400).json(err);
    }

    result.forEach(cur => {
      cur.categorias = cur.categorias.replace("[", "").replace("]", "").replaceAll("\"", "").split(", ");
    })

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



router.get("/badges", isAuthenticated, (req, res) => {

  const q = "SELECT * FROM ins_insignia";
  db.query(q, (err, result) => {
    if(err) {
      return res.status(400).json(err);
    }
    return res.json(result);

  })
})

router.post("/createBadge", upload.single('ins_icone'), isAuthenticated, (req, res) => {
  
  const badge = [
    req.body.ins_titulo,
    req.body.ins_qtdCursos,
    req.file.filename,
  ]

  const q = "INSERT INTO ins_insignia (ins_titulo, ins_qtdCursos, ins_icone) VALUES (?)";
  db.query(q, [badge], (err, result) => {
    if(err){
      return res.status(400).json(err);
    }
    return res.json(result);

  })
})

router.put("/editBadge/:id", upload.single('ins_icone'), isAuthenticated, (req, res) => {

  const id = req.params.id;

  const badge = [
    req.body.ins_titulo,
    req.body.ins_qtdCursos,
    req.file.filename,
  ]

  const q = `UPDATE ins_insignia SET ins_titulo = ?, ins_qtdCursos = ?, ins_icone = ? WHERE ins_id = ${id}`;
  db.query(q, badge, (err, result) => {
    if(err) {
      return res.status(400).json(err);
    }
    return res.json(result);

  })
})

router.delete("/deleteBadge/:id", isAuthenticated, (req, res) => {

  const id = req.params.id;

  const q = `DELETE FROM ins_insignia WHERE ins_id = ${id}`;
  db.query(q, (err, result) => {
    if(err) {
      return res.status(400).json(err);
    }
    return res.json(result);

  })
})

module.exports = router;