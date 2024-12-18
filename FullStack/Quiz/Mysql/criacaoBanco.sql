create database quiz;
use quiz;

create table Questoes
(
	id int primary key not null auto_increment,
    pergunta varchar(100) not null
);

create table Respostas
(
    valor varchar(100) not null,
	certa bool,
    idQuestao int not null,
    
    foreign key(idQuestao) references Questoes(id)
);
