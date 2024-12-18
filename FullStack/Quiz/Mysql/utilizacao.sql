select * FROM Questoes;
select * FROM Respostas;

select * FROM Respostas where idQuestao = 0;
delete from Respostas where idQuestao = 0;

TRUNCATE TABLE Questoes;
TRUNCATE TABLE Respostas;

insert into Questoes(pergunta) values(
    'Quem era o Presidente dos EUA em 2025'
);
insert into Respostas(valor,certa,idQuestao) values
('Lula',false,LAST_INSERT_ID()),
('Trump',true,LAST_INSERT_ID()),
('Biden',false,LAST_INSERT_ID()),
('Bolsonaro',false,LAST_INSERT_ID());


insert into Questoes(pergunta) values(
    'Qual continente está localizado o Brasil'
);

insert into Respostas(valor,certa,idQuestao) values
('Europa',false,LAST_INSERT_ID()),
('Africa',false,LAST_INSERT_ID()),
('Africa do Sul',false,LAST_INSERT_ID()),
('America',true,LAST_INSERT_ID());


