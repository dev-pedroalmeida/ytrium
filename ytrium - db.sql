create database ytrium;
use ytrium;


create table usu_usuario(
	usu_id int primary key auto_increment,
    usu_nome varchar(50) not null,
    usu_email varchar(100) unique not null,
    usu_senha varchar(100) not null,
    usu_status boolean,
    usu_tipo varchar(20),
    usu_experiencia int,
    usu_nivel int
);
select * from usu_usuario;
select * from alc_aluno_curso;
update usu_usuario set usu_experiencia = 0, usu_nivel = 0 where usu_id = 1;
update alc_aluno_curso set alc_status = 0 where alc_alunoId = 1;


SELECT COUNT(*) AS qtdCompletos FROM alc_aluno_curso WHERE alc_alunoId = 1 AND alc_status = 1;

SELECT ins_id, ins_titulo, ins_qtdCursos, ins_icone FROM ins_insignia WHERE ins_qtdCursos = 2;

SELECT COUNT(*) AS hasBadge FROM ali_aluno_insignia WHERE ali_alunoId = 1 AND ali_insigniaId = 1;

INSERT INTO ali_aluno_insignia (ali_alunoId, ali_insigniaId) VALUES (1, 1);
delete from ali_aluno_insignia where ali_alunoId = 1;




insert into usu_usuario (usu_nome, usu_email, usu_senha, usu_tipo) VALUES ('Admin', 'admin@hotmail.com', '6a74b56ecb3cd21d3e58f1b6733c28e5c4da8e4ca42e69f5ae847d7d065591fb', 'admin');
insert into usu_usuario (usu_nome, usu_email, usu_senha, usu_tipo) VALUES ('Instrutor', 'ins@hotmail.com', '6a74b56ecb3cd21d3e58f1b6733c28e5c4da8e4ca42e69f5ae847d7d065591fb', 'instrutor');
insert into usu_usuario (usu_nome, usu_email, usu_senha, usu_tipo) VALUES ('Pedro Henrique', 'pedro@hotmail.com', '6a74b56ecb3cd21d3e58f1b6733c28e5c4da8e4ca42e69f5ae847d7d065591fb', 'estudante');


create table cur_curso(
	cur_id int primary key auto_increment,
    cur_titulo varchar(50) not null,
    cur_descricao text not null,
    cur_qtdInscritos int,
    cur_dificuldade varchar(50) not null,
    cur_qtdExperiencia int not null,
    cur_status varchar(20),
    cur_dtCriacao datetime,
    cur_ultimaAtualizacao datetime,
    cur_instrutorId int,
    foreign key(cur_instrutorId) references usu_usuario(usu_id) on delete cascade
);
select * from cur_curso;

create table cat_categoria(
	cat_id int primary key auto_increment,
    cat_descricao varchar(20) not null
);
select * from cat_categoria;

create table cct_curso_categoria(
	cct_id int primary key auto_increment,
    cct_cursoId int,
    cct_categoriaId int,
    foreign key(cct_cursoId) references cur_curso(cur_id) on delete cascade,
    foreign key(cct_categoriaId) references cat_categoria(cat_id) on delete restrict
);
select * from cct_curso_categoria;

create table alc_aluno_curso(
	alc_id int primary key auto_increment,
    alc_alunoId int,
    alc_cursoId int,
    alc_status boolean,
    alc_dtFinalizacao datetime,
    foreign key(alc_alunoId) references usu_usuario(usu_id) on delete cascade,
    foreign key(alc_cursoId) references cur_curso(cur_id) on delete cascade
);
select * from alc_aluno_curso;

create table mod_modulo(
	mod_id int primary key auto_increment,
    mod_titulo varchar(100) not null,
    mod_index int,
    mod_cursoId int,
    foreign key(mod_cursoId) references cur_curso(cur_id) on delete cascade
);
select * from mod_modulo;

create table alm_aluno_modulo(
	alm_id int primary key auto_increment,
    alm_alunoId int,
    alm_moduloId int,
    alm_completo boolean,
    foreign key(alm_alunoId) references usu_usuario(usu_id) on delete cascade,
    foreign key(alm_moduloId) references mod_modulo(mod_id) on delete cascade
);
select * from alm_aluno_modulo;
update alm_aluno_modulo set alm_completo = 0 where alm_alunoId = 3;

create table con_conteudo(
	con_id int primary key auto_increment,
    con_titulo varchar(100) not null,
    con_material text,
    con_videoLink varchar(100),
    con_index int,
    con_moduloId int,
    foreign key(con_moduloId) references mod_modulo(mod_id) on delete cascade
);
select * from con_conteudo;

update con_conteudo set con_videoLink = "https://www.youtube.com/watch?v=OmmJBfcMJA8" where con_id = 13;

create table aco_aluno_conteudo(
	aco_id int primary key auto_increment,
    aco_alunoId int,
    aco_conteudoId int,
    aco_completo boolean,
    foreign key(aco_alunoId) references usu_usuario(usu_id) on delete cascade,
    foreign key(aco_conteudoId) references con_conteudo(con_id) on delete cascade
);
select * from aco_aluno_conteudo;
update aco_aluno_conteudo set aco_completo=0 where aco_alunoId=3;

create table qui_quizz(
	qui_id int primary key auto_increment,
    qui_titulo varchar(100) not null,
    qui_index int,
    qui_moduloId int,
    foreign key(qui_moduloId) references mod_modulo(mod_id) on delete cascade
);
select * from qui_quizz;
delete from qui_quizz where qui_id=11;

create table alq_aluno_quizz(
	alq_id int primary key auto_increment,
    alq_alunoId int,
    alq_quizzId int,
    alq_completo boolean,
    alq_porcentagemAcertos int,
    foreign key(alq_alunoId) references usu_usuario(usu_id) on delete cascade,
    foreign key(alq_quizzId) references qui_quizz(qui_id) on delete cascade
);
select * from alq_aluno_quizz;
update alq_aluno_quizz set alq_completo = 0, alq_porcentagemAcertos = null where alq_alunoId = 3;

create table que_questao(
	que_id int primary key auto_increment,
    que_pergunta varchar(300) not null,
    que_index int,
    que_quizzId int,
    foreign key(que_quizzId) references qui_quizz(qui_id) on delete cascade
);
select * from que_questao;

create table alt_alternativa(
	alt_id int primary key auto_increment,
    alt_alternativa varchar(200) not null,
    alt_correta boolean,
    alt_index int,
    alt_questaoId int,
    foreign key(alt_questaoId) references que_questao(que_id) on delete cascade
);
select * from alt_alternativa;

create table ins_insignia(
	ins_id int primary key auto_increment,
    ins_titulo varchar(50) not null,
    ins_qtdCursos int not null,
    ins_icone varchar(100)
);
select * from ins_insignia;

create table ali_aluno_insignia(
	ali_id int primary key auto_increment,
    ali_alunoId int,
    ali_insigniaId int,
    foreign key(ali_alunoId) references usu_usuario(usu_id) on delete cascade,
    foreign key(ali_insigniaId) references ins_insignia(ins_id) on delete restrict
);
select * from ali_aluno_insignia;

SELECT DISTINCT ins_id, ins_titulo, ins_qtdCursos, ins_icone FROM ins_insignia
left JOIN ali_aluno_insignia on ali_alunoId = 1;










select c.cur_id, c.cur_titulo, c.cur_descricao, c.cur_status, c.cur_qtdInscritos, c.cur_dificuldade, c.cur_qtdExperiencia, u.usu_nome, al.alc_status,
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
left join alc_aluno_curso al on al.alc_cursoId = c.cur_id and al.alc_alunoId = 3
where c.cur_status = 'publico' and c.cur_id = 28 limit 1;


/*
Subscribed
Subscribed
Subscribed
*/
select c.cur_id, c.cur_titulo, c.cur_descricao, c.cur_status, c.cur_qtdInscritos, c.cur_dificuldade, c.cur_qtdExperiencia, u.usu_nome, al.alc_status,
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
    left join alm_aluno_modulo alm on alm.alm_moduloId = mm.mod_id and alm.alm_alunoId = 3
    inner join (
		select distinct m.mod_id, json_arrayagg(json_object('id', cn.con_id, 'titulo', cn.con_titulo, 'material', cn.con_material, 'videoLink', cn.con_videoLink, 'completo', aco.aco_completo, 'index', cn.con_index)) as conteudos
		from mod_modulo m
		inner join con_conteudo cn on cn.con_moduloId = m.mod_id
        left join aco_aluno_conteudo aco on aco.aco_conteudoId = cn.con_id and aco.aco_alunoId = 3
		group by m.mod_id
	) as modulo_conteudos on modulo_conteudos.mod_id = mm.mod_id
    inner join (
		select distinct m.mod_id, json_arrayagg(json_object('id', qu.qui_id, 'titulo', qu.qui_titulo, 'completo', alq.alq_completo, 'index', qu.qui_index, 'questoes', quizz_questoes.questoes)) as quizzes
		from mod_modulo m
		inner join qui_quizz qu on qu.qui_moduloId = m.mod_id
        left join alq_aluno_quizz alq on alq.alq_quizzId = qu.qui_id and alq.alq_alunoId = 3
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
left join alc_aluno_curso al on al.alc_cursoId = c.cur_id and al.alc_alunoId = 3
where c.cur_status = 'publico' and c.cur_id = 28 limit 1;

/* for student */
/* for student */
/* for student */
select c.cur_id, c.cur_titulo, c.cur_status, c.cur_qtdInscritos, u.usu_nome, json_arrayagg(ca.cat_descricao) as categorias 
from cur_curso c
inner join cct_curso_categoria cc on cc.cct_cursoId = c.cur_id 
inner join cat_categoria ca on cc.cct_categoriaId = ca.cat_id
inner join usu_usuario u on u.usu_id = c.cur_instrutorId
where c.cur_status = 'publico' group by c.cur_id;

/* for instructor */
/* for instructor */
/* for instructor */
select c.cur_id, c.cur_titulo, c.cur_status, c.cur_qtdInscritos, json_arrayagg(ca.cat_descricao) as categorias 
from cur_curso c
inner join cct_curso_categoria cc on cc.cct_cursoId = c.cur_id 
inner join cat_categoria ca on cc.cct_categoriaId = ca.cat_id
inner join usu_usuario u on u.usu_id = c.cur_instrutorId
where u.usu_id = 4 group by c.cur_id;




select c.cur_id, c.cur_titulo, c.cur_descricao, c.cur_status, c.cur_qtdInscritos, c.cur_dificuldade, c.cur_qtdExperiencia, u.usu_nome, al.alc_status, mod_cat.categorias as categorias, modulos.modulos from cur_curso c inner join cct_curso_categoria cc on cc.cct_cursoId = c.cur_id inner join ( select distinct cc.cct_cursoId, json_arrayagg(json_object('id', ca.cat_id, 'descricao', ca.cat_descricao)) as categorias from cct_curso_categoria cc inner join cat_categoria ca on cc.cct_categoriaId = ca.cat_id group by cc.cct_cursoId ) as mod_cat on mod_cat.cct_cursoId = cc.cct_cursoId inner join ( select distinct mm.mod_cursoId, json_arrayagg(json_object('id', mm.mod_id, 'titulo', mm.mod_titulo, 'index', mm.mod_index, 'conteudos', modulo_conteudos.conteudos, 'quizzes', modulo_quizzes.quizzes)) as modulos from mod_modulo mm inner join cur_curso c on c.cur_id = mm.mod_cursoId inner join ( select distinct m.mod_id, json_arrayagg(json_object('id', cn.con_id, 'titulo', cn.con_titulo, 'material', cn.con_material, 'videoLink', cn.con_videoLink, 'index', cn.con_index)) as conteudos from mod_modulo m inner join con_conteudo cn on cn.con_moduloId = m.mod_id group by m.mod_id ) as modulo_conteudos on modulo_conteudos.mod_id = mm.mod_id inner join ( select distinct m.mod_id, json_arrayagg(json_object('id', qu.qui_id, 'titulo', qu.qui_titulo, 'index', qu.qui_index, 'questoes', quizz_questoes.questoes)) as quizzes from mod_modulo m inner join qui_quizz qu on qu.qui_moduloId = m.mod_id inner join ( select distinct qu.qui_id, json_arrayagg(json_object('id', qe.que_id, 'pergunta', qe.que_pergunta, 'index', qe.que_index, 'alternativas', questao_alternativas.alternativas)) as questoes from qui_quizz qu inner join que_questao qe on qe.que_quizzId = qu.qui_id inner join ( select distinct qe.que_id, json_arrayagg(json_object('id', al.alt_id, 'alternativa', al.alt_alternativa, 'correta', al.alt_correta, 'index', al.alt_index)) as alternativas from que_questao qe inner join alt_alternativa al on al.alt_questaoId = qe.que_id group by qe.que_id ) as questao_alternativas on questao_alternativas.que_id = qe.que_id group by qu.qui_id ) as quizz_questoes on quizz_questoes.qui_id = qu.qui_id group by m.mod_id ) as modulo_quizzes on modulo_quizzes.mod_id = mm.mod_id group by mm.mod_cursoId ) as modulos on modulos.mod_cursoId = c.cur_id inner join usu_usuario u on u.usu_id = c.cur_instrutorId left join alc_aluno_curso al on al.alc_cursoId = c.cur_id and al.alc_alunoId = 2 where c.cur_status = 'publico' and c.cur_id = 9 limit 1;

select c.cur_id, c.cur_titulo, c.cur_status, c.cur_qtdInscritos, c.cur_dificuldade, c.cur_qtdExperiencia, u.usu_nome, al.alc_status, modulos.quantidade, modulos.completos
from cur_curso c
inner join (
	select distinct mm.mod_cursoId, count(*) as quantidade, sum(if(alm.alm_completo = 1, 1, 0)) as completos
    from mod_modulo mm
    inner join cur_curso c on c.cur_id = mm.mod_cursoId
    left join alm_aluno_modulo alm on alm.alm_moduloId = mm.mod_id and alm.alm_alunoId = 4
    group by mm.mod_cursoId
) as modulos on modulos.mod_cursoId = c.cur_id
inner join usu_usuario u on u.usu_id = c.cur_instrutorId
right join alc_aluno_curso al on al.alc_cursoId = c.cur_id and al.alc_alunoId = 4
where c.cur_status = 'publico';



