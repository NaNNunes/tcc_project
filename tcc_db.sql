create database tcc_db;
use tcc_db;
drop DATABASE tcc_db;

-- tabelas primarias
CREATE TABLE operador(
	id_op INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	nome_op VARCHAR(20) UNIQUE DEFAULT"user",
	senha VARCHAR(12),
	qtd_Acess INT DEFAULT 0,
	pergnt_recup ENUM("Qual é o nome do seu primeiro pet", "Qual é a sua cor favorita?", "Qual das casas é a sua casa?"),
	resp_recup VARCHAR(100) NOT NULL
);
DROP DATABASE operador;

CREATE TABLE cliente(
	id_cliente INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	cpf VARCHAR(11) UNIQUE,
	nome_cliente VARCHAR(30),
	n_telefone VARCHAR(11)
);
DROP DATABASE cliente;

CREATE TABLE endereco(
	id_endereco INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	cep VARCHAR(8) NOT NULL,
	nome_lagradouro VARCHAR(20),
	bairro VARCHAR(20),
	localidade VARCHAR(20),
	UF CHAR(2)
);
DROP DATABASE endereco;

-- TABELAS SECUNDARIAS
CREATE TABLE dispositivo(
	id_dispositivo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_cliente INT,
    n_serie VARCHAR(20),
    marca VARCHAR(15),
    modelo VARCHAR(15),
    estado ENUM("1","2","3"), -- definir quais os estados do dispositivo
    status_bat ENUM("1","2","3"),
    status_displ ENUM("1","2","3"),
    status_hw ENUM("1","2","3"), -- status hardware
    amperagem VARCHAR(5),
    voltagem VARCHAR(5),
    CONSTRAINT FK_DEVICE_ClientID FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);
DROP TABLE dispositivo;

CREATE TABLE cliente_endereco(
	id_cl INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_endereco INT,
    id_cliente INT,
	numero_endereco VARCHAR(5),
    complemento VARCHAR(15),
    CONSTRAINT FK_CLIENTADD_AddresID FOREIGN KEY (id_endereco) REFERENCES endereco(id_endereco),
    CONSTRAINT FK_CLIENTADD_ClientID FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);
DROP TABLE cliente_endereco;

-- TABELA TERCIARIA
CREATE TABLE os(
	id_os INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_dispositivo INT,
    id_op_responsavel INT,
    orcamento DECIMAL(7,2),
    valor_total DECIMAL(7,2),
    data_registro DATE,
    prev_entrega DATE,
    descricao VARCHAR(200),
    url_img VARCHAR(200),
    CONSTRAINT FK_OS_ClientID FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    CONSTRAINT FK_OS_DevicID FOREIGN KEY (id_dispositivo) REFERENCES dispositivo(id_dispositivo),
    CONSTRAINT FK_OS_OpID FOREIGN KEY (id_op_responsavel) REFERENCES operador(id_op)
);
DROP TABLE os;

-- tabelas quaternarias
CREATE TABLE operador_os(
	id_op_os INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_op INT,
    id_os INT,
    op_ultimo_acesso DATE,
    CONSTRAINT FK_OPOS_OpID FOREIGN KEY (id_op) REFERENCES operador(id_op),
    CONSTRAINT FK_OPOS_OsID FOREIGN KEY (id_os) REFERENCES os(id_os)
);
DROP TABLE operador_os;

CREATE TABLE peca(
	id_peca INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_os INT,
    voltagem VARCHAR(5),
    amperagem VARCHAR(5),
    nome VARCHAR(20),
    CONSTRAINT FK_PECA_OsID FOREIGN KEY (id_os) REFERENCES os(id_os)
);
DROP TABLE peca;