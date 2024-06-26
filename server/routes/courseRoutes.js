const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
  const token = req.cookies.token;
  if(!token) return res.status(400).json('Token inválido!');

  next();
}

router.get("/getAll", isAuthenticated, (req, res) => {

  const q = "select c.cur_id, c.cur_titulo, c.cur_status, c.cur_qtdInscritos, c.cur_dificuldade, u.usu_nome, json_arrayagg(ca.cat_descricao) as categorias from cur_curso c inner join cct_curso_categoria cc on cc.cct_cursoId = c.cur_id inner join cat_categoria ca on cc.cct_categoriaId = ca.cat_id inner join usu_usuario u on u.usu_id = c.cur_instrutorId where c.cur_status = 'publico' group by c.cur_id;";
  db.query(q, 'publico', (err, result) => {
    if(err) {
      return res.status(400).json(err);
    }

    result.forEach(cur => {
      cur.categorias = cur.categorias.replace("[", "").replace("]", "").replaceAll("\"", "").split(", ");
    })

    return res.json(result);
  });
})

router.get("/:courseId", isAuthenticated, (req, res) => {

  const { id } = jwt.verify(req.cookies.token, 'jkey');

  const q = `select c.cur_id, c.cur_titulo, c.cur_descricao, c.cur_status, c.cur_qtdInscritos, c.cur_dificuldade, c.cur_qtdExperiencia, u.usu_nome, al.alc_status, 
            mod_cat.categorias as categorias, modulos.modulos 
            from cur_curso c 
            inner join cct_curso_categoria cc on cc.cct_cursoId = c.cur_id 
            inner join ( 
              select distinct cc.cct_cursoId, json_arrayagg(json_object('id', ca.cat_id, 'descricao', ca.cat_descricao)) as categorias 
                from cct_curso_categoria cc 
                inner join cat_categoria ca on cc.cct_categoriaId = ca.cat_id 
                group by cc.cct_cursoId 
            ) as mod_cat on mod_cat.cct_cursoId = cc.cct_cursoId 
            left join ( 
              select distinct mm.mod_cursoId, json_arrayagg(json_object('id', mm.mod_id, 'titulo', mm.mod_titulo, 'index', mm.mod_index, 'conteudos', modulo_conteudos.conteudos, 'quizzes', modulo_quizzes.quizzes)) as modulos 
                from mod_modulo mm 
                inner join cur_curso c on c.cur_id = mm.mod_cursoId 
                left join ( 
                select distinct m.mod_id, json_arrayagg(json_object('id', cn.con_id, 'titulo', cn.con_titulo, 'material', cn.con_material, 'videoLink', cn.con_videoLink, 'index', cn.con_index)) as conteudos 
                    from mod_modulo m 
                    left join con_conteudo cn on cn.con_moduloId = m.mod_id 
                    group by m.mod_id 
              ) as modulo_conteudos on modulo_conteudos.mod_id = mm.mod_id 
                left join ( 
                select distinct m.mod_id, json_arrayagg(json_object('id', qu.qui_id, 'titulo', qu.qui_titulo, 'index', qu.qui_index, 'questoes', quizz_questoes.questoes)) as quizzes 
                    from mod_modulo m 
                    left join qui_quizz qu on qu.qui_moduloId = m.mod_id 
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
            left join alc_aluno_curso al on al.alc_cursoId = c.cur_id and al.alc_alunoId = (?) where c.cur_id = (?) limit 1;`;

  db.query(q, [id, req.params.courseId], (err, result) => {
    if(err) {
      return res.status(400).json(err);
    }

    if(result.length < 1) {
      return res.status(404).json({errId: 1, message: 'Curso não encontrado!'});
    }

    let curso = result[0];
    curso.categorias = JSON.parse(curso.categorias);
    curso.modulos = JSON.parse(curso.modulos);
    curso.modulos = curso.modulos.sort((a,b) => a.index - b.index);

    return res.json(curso);
  });
})

module.exports = router;