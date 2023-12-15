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
    foreign key(cct_categoriaId) references cat_categoria(cat_id) on delete cascade
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

create table aco_aluno_conteudo(
	aco_id int primary key auto_increment,
    aco_alunoId int,
    aco_conteudoId int,
    aco_completo boolean,
    foreign key(aco_alunoId) references usu_usuario(usu_id) on delete cascade,
    foreign key(aco_conteudoId) references con_conteudo(con_id) on delete cascade
);
select * from aco_aluno_conteudo;

create table qui_quizz(
	qui_id int primary key auto_increment,
    qui_titulo varchar(100) not null,
    qui_index int,
    qui_moduloId int,
    foreign key(qui_moduloId) references mod_modulo(mod_id) on delete cascade
);
select * from qui_quizz;

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
    foreign key(ali_insigniaId) references ins_insignia(ins_id) on delete cascade
);
select * from ali_aluno_insignia;
