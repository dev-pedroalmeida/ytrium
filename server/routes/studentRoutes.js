const express = require('express');
const router = express.Router();
const db = require('../db')
const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
  const token = req.cookies.token;
  if(!token) return res.status(400).json('Token inválido!');

  const decoded = jwt.verify(token, 'jkey');

  if(decoded.tipo !== 'estudante') return res.status(401).json('Acesso restrito!');

  next();
}

router.post("/subscribe", isAuthenticated, (req, res) => {
  const { id } = jwt.verify(req.cookies.token, 'jkey');

  const curso = req.body.curso;

  const qCheckSubbed = "select count(*) as cad from alc_aluno_curso where alc_alunoId = ? and alc_cursoId = ?";

  db.query(qCheckSubbed, [id, curso.cur_id], (errQc, result) => {
    if(errQc) {
      res.status(400).json(errQc);
    } else {
      if(result[0].cad >= 1) {
        res.status(401).json("Já inscrito!");
      } else {

        const q = "INSERT INTO alc_aluno_curso (`alc_alunoId`, `alc_cursoId`, `alc_status`) VALUES (?)";

        db.query(q, [[id, curso.cur_id, false]], (err, result) => {
          if(err) {
            res.status(400).json(err);
          } else {

            const upQ = "UPDATE cur_curso SET cur_qtdInscritos = cur_qtdInscritos + 1 WHERE cur_id = ?";
            db.query(upQ, [curso.cur_id], (errU) => {
              if(errU) {
                res.status(400).json(errU);
              }
            })

            const q2 = "INSERT INTO alm_aluno_modulo (`alm_alunoId`, `alm_moduloId`, `alm_completo`) VALUES (?)";
        
            curso.modulos.forEach((mod, index) => {
              db.query(q2, [[id, mod.id, false]], (err2, result2) => {
                if(err2) {
                  res.status(400).json(err2);
                } else {
        
                  const q3 = "INSERT INTO aco_aluno_conteudo (`aco_alunoId`, `aco_conteudoId`, `aco_completo`) VALUES (?)";
        
                  curso.modulos[index].conteudos.forEach(con => {
                    db.query(q3, [[id, con.id, false]], (err3, result3) => {
                      if(err3) {
                        res.status(400).json(err3);
                      }
                    })
                  })
        
                  const q4 = "INSERT INTO alq_aluno_quizz (`alq_alunoId`, `alq_quizzId`, `alq_completo`) VALUES (?)";
        
                  curso.modulos[index].quizzes.forEach(qui => {
                    db.query(q4, [[id, qui.id, false]], (err4, result4) => {
                      if(err4) {
                        res.status(400).json(err4);
                      }
                    })
                  })
                  res.end();
                }
              })
            });
          }
        })

      }
    }
  })

})

router.get("/subscriptions", isAuthenticated, (req, res) => {
  const {id} = jwt.verify(req.cookies.token, 'jkey');

  const q = `select c.cur_id, c.cur_titulo, c.cur_status, c.cur_qtdInscritos, c.cur_dificuldade, c.cur_qtdExperiencia, u.usu_nome, al.alc_status, modulos.modulos
              from cur_curso c
              inner join (
                select distinct mm.mod_cursoId, json_arrayagg(json_object('completo', alm.alm_completo)) as modulos
                  from mod_modulo mm
                  inner join cur_curso c on c.cur_id = mm.mod_cursoId
                  left join alm_aluno_modulo alm on alm.alm_moduloId = mm.mod_id and alm.alm_alunoId = ${id}
                  group by mm.mod_cursoId
              ) as modulos on modulos.mod_cursoId = c.cur_id
              inner join usu_usuario u on u.usu_id = c.cur_instrutorId
              left join alc_aluno_curso al on al.alc_cursoId = c.cur_id and al.alc_alunoId = ${id}
              where c.cur_status = 'publico' and c.cur_id = ? limit 1;`

  db.query(q, [req.params.courseId], (err, result) => {
    if(err) {
      res.status(400).json(err);
    }

    if(result.length < 1) {
      return res.status(404).json("Curso não encontrado!");
    }

    let curso = result[0];
    curso.modulos = JSON.parse(curso.modulos);
    curso.modulos = curso.modulos.sort((a,b) => a.index - b.index);

    return res.json(curso);
  })
  
})

router.get("/subscribed/:courseId", isAuthenticated, (req, res) => {

  const {id} = jwt.verify(req.cookies.token, 'jkey');

  const q = `select c.cur_id, c.cur_titulo, c.cur_descricao, c.cur_status, c.cur_qtdInscritos, c.cur_dificuldade, c.cur_qtdExperiencia, u.usu_nome, al.alc_status,
  mod_cat.categorias as categorias,
  modulos.modulos
  from cur_curso c
  inner join cct_curso_categoria cc on cc.cct_cursoId = c.cur_id
  inner join (
    select distinct cc.cct_cursoId, json_arrayagg(json_object('id', ca.cat_id, 'descricao', ca.cat_descricao)) as categorias
      from cct_curso_categoria cc
      inner join cat_categoria ca on cc.cct_categoriaId = ca.cat_id
      group by cc.cct_cursoId
  ) as mod_cat on mod_cat.cct_cursoId = cc.cct_cursoId
  inner join (
    select distinct mm.mod_cursoId, json_arrayagg(json_object('id', mm.mod_id, 'titulo', mm.mod_titulo, 'completo', alm.alm_completo, 'index', mm.mod_index, 'conteudos', modulo_conteudos.conteudos, 'quizzes', modulo_quizzes.quizzes)) as modulos
      from mod_modulo mm
      inner join cur_curso c on c.cur_id = mm.mod_cursoId
      left join alm_aluno_modulo alm on alm.alm_moduloId = mm.mod_id and alm.alm_alunoId = ${id}
      inner join (
      select distinct m.mod_id, json_arrayagg(json_object('id', cn.con_id, 'titulo', cn.con_titulo, 'material', cn.con_material, 'videoLink', cn.con_videoLink, 'completo', aco.aco_completo, 'index', cn.con_index)) as conteudos
      from mod_modulo m
      inner join con_conteudo cn on cn.con_moduloId = m.mod_id
          left join aco_aluno_conteudo aco on aco.aco_conteudoId = cn.con_id and aco.aco_alunoId = ${id}
      group by m.mod_id
    ) as modulo_conteudos on modulo_conteudos.mod_id = mm.mod_id
      inner join (
      select distinct m.mod_id, json_arrayagg(json_object('id', qu.qui_id, 'titulo', qu.qui_titulo, 'completo', alq.alq_completo, 'index', qu.qui_index, 'questoes', quizz_questoes.questoes)) as quizzes
      from mod_modulo m
      inner join qui_quizz qu on qu.qui_moduloId = m.mod_id
          left join alq_aluno_quizz alq on alq.alq_quizzId = qu.qui_id and alq.alq_alunoId = ${id}
          inner join (
        select distinct qu.qui_id, json_arrayagg(json_object('id', qe.que_id, 'pergunta', qe.que_pergunta, 'index', qe.que_index, 'alternativas', questao_alternativas.alternativas)) as questoes
        from qui_quizz qu
        inner join que_questao qe on qe.que_quizzId = qu.qui_id
              inner join (
          select distinct qe.que_id, json_arrayagg(json_object('id', al.alt_id, 'alternativa', al.alt_alternativa, 'correta', al.alt_correta, 'index', al.alt_index)) as alternativas
          from que_questao qe
          inner join alt_alternativa al on al.alt_questaoId = qe.que_id
          group by qe.que_id
        ) as questao_alternativas on questao_alternativas.que_id = qe.que_id
        group by qu.qui_id
      ) as quizz_questoes on quizz_questoes.qui_id = qu.qui_id
      group by m.mod_id
    ) as modulo_quizzes on modulo_quizzes.mod_id = mm.mod_id
      group by mm.mod_cursoId
  ) as modulos on modulos.mod_cursoId = c.cur_id
  inner join usu_usuario u on u.usu_id = c.cur_instrutorId
  left join alc_aluno_curso al on al.alc_cursoId = c.cur_id and al.alc_alunoId = ${id}
  where c.cur_status = 'publico' and c.cur_id = ? limit 1;`;

  db.query(q, [req.params.courseId], (err, result) => {
    if(err) {
      res.status(400).json(err);
    }

    if(result.length < 1) {
      return res.status(404).json("Curso não encontrado!");
    }

    let curso = result[0];
    curso.categorias = JSON.parse(curso.categorias);
    curso.modulos = JSON.parse(curso.modulos);
    curso.modulos = curso.modulos.sort((a,b) => a.index - b.index);

    return res.json(curso);
  })

})

module.exports = router;