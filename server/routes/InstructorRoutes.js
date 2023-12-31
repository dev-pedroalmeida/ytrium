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

  const q = "select c.cur_id, c.cur_titulo, c.cur_status, c.cur_qtdInscritos, json_arrayagg(ca.cat_descricao) as categorias from cur_curso c inner join cct_curso_categoria cc on cc.cct_cursoId = c.cur_id inner join cat_categoria ca on cc.cct_categoriaId = ca.cat_id inner join usu_usuario u on u.usu_id = c.cur_instrutorId where u.usu_id = ? group by c.cur_id;";
  db.query(q, id, (err, result) => {
    if(err) {
      return res.status(400).json(err);
    }

    result.forEach(cur => {
      cur.categorias = cur.categorias.replace("[", "").replace("]", "").replaceAll("\"", "").split(", ");
    })

    return res.json(result);
  });
})

router.post("/newCourse", isAuthenticated, (req, res) => {

  const { id } = jwt.verify(req.cookies.token, 'jkey');

  const course = [
    id,
    req.body.titulo,
    req.body.descricao,
    req.body.dificuldade,
    req.body.experiencia,
    0,
    'pendente',
  ]

  for(let i in course) {
    if(
      course[i] === null ||
      course[i] === undefined ||
      course[i] === ""
    ) {
      res.status(400).json(`Preencha todos os campos! ${i}`)
    }
  }
  
  if(req.body.categorias.length < 1) {
    res.status(400).json("O curso precisa ter pelo menos uma categoria!");
    return res.end();
  }

  if(req.body.modulos.length < 1) {
    res.status(400).json("O curso precisa ter pelo menos um módulo!")
    return res.end();
  }


  
  const q = "INSERT INTO cur_curso (`cur_instrutorId`, `cur_titulo`, `cur_descricao`, `cur_dificuldade`, `cur_qtdExperiencia`, `cur_qtdInscritos`, `cur_status`) VALUES (?)";

  db.query(q, [course], (err, result) => {
    if(err) {
      res.status(400).json(err);
      return res.end();
    }


    const cur_id = result.insertId;

    const categorias = req.body.categorias.map(c => [cur_id, c.value]);
    

    const q2 = "INSERT INTO cct_curso_categoria (`cct_cursoId`, `cct_categoriaId`) VALUES ?";

    db.query(q2, [categorias], (err2, result2) => {
      if(err2) {
        res.status(400).json(err2);
        return res.end();
      }
    })

    
    req.body.modulos.forEach((mod, index) => {

      const modulo = [mod.titulo, mod.index, cur_id];

      const q3 = "INSERT INTO mod_modulo (`mod_titulo`, `mod_index`, `mod_cursoId`) VALUES (?)";

      db.query(q3, [modulo], (err3, result3) => {
        if(err3) {
          res.status(400).json(err3).end();
        }
  
        const modId = result3.insertId;

        const conteudos = mod.conteudos.map(c => [c.titulo, c.material, c.videoLink, c.index, modId]);

        const q4 = "INSERT INTO con_conteudo (`con_titulo`, `con_material`, `con_videoLink`, `con_index`, `con_moduloId`) VALUES ?";

        db.query(q4, [conteudos], (err4, result4) => {
          if(err4) {
            res.status(400).json(err4).end();
          }
        })

        
        mod.quizzes.forEach(qui => {
          
          const quizz = [qui?.titulo, qui?.index, modId];
  
          const q5 = "INSERT INTO qui_quizz (`qui_titulo`, `qui_index`, `qui_moduloId`) VALUES (?)";
          
          db.query(q5, [quizz], (err5, result5) => {
            if(err5) {
              res.status(400).json(err5).end();
            }

            const quizzId = result5.insertId;
            
            
            qui.questoes.forEach(que => {

              const questao = [que.pergunta, 0, quizzId];

              const q6 = "INSERT INTO que_questao (`que_pergunta`, `que_index`, `que_quizzId`) VALUES (?)";

              db.query(q6, [questao], (err6, result6) => {
                if(err6) {
                  // console.log(err6)
                  res.status(400).json(err6).end();
                } else {
                  
                  const questaoId = result6.insertId;
  
                  const alternativas = que.alternativas.map(a => [a.alternativa, a.correta, 0, questaoId]);
  
                  const q7 = "INSERT INTO alt_alternativa (`alt_alternativa`, `alt_correta`, `alt_index`, alt_questaoId) VALUES ?";
  
                  db.query(q7, [alternativas], (err7) => {
                    if(err7) {
                      res.status(400).json(err7).end();
                    }
  
                    })
                }

              })
            })
          })
        })
      })
    })
  })
  return res.end();
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

module.exports = router;