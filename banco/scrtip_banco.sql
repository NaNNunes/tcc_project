create DATABASE tcc_db;
use tcc_db;
DROP DATABASE tcc_db;

-- tirar endereço multiplo
-- gestor solicitou suspender a criacao de operador por enquanto
-- focar em demanda

CREATE TABLE SOLICITANTE(
	id_solicitante INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    cpf_solicitante VARCHAR(11) NOT NULL UNIQUE,
    name_solicitante VARCHAR(30) NOT NULL,
    surname_solicitante VARCHAR(30) NOT NULL,
    email_solicitante VARCHAR(320) NOT NULL UNIQUE,
	tel_solicitante VARCHAR(11) UNIQUE,
    senha_solicitante VARCHAR(20) NOT NULL,
    dt_cadastro_solicitante DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active_solicitante TINYINT(1) DEFAULT 1 -- 1 ATIVO 0 INATIVO
);

CREATE TABLE DISPOSITIVO(
	id_disp INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_solicitante_disp INT,
    id_hw_disp VARCHAR(23) UNIQUE,
    categ_disp ENUM('MOVEL', 'NOTEBOOK', 'CONSOLE', 'DESKTOP', 'OUTRO'),
    fab_disp VARCHAR(45),
    marca_disp VARCHAR(45),
    modelo_disp VARCHAR(30),
    cor_disp VARCHAR(20),
    voltagem_disp VARCHAR(3),
    dt_cad_disp DATETIME DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT FK_Disp_Solic FOREIGN KEY (id_solicitante_disp) REFERENCES solicitante(id_solicitante)
);
DROP TABLE dispositivo;

CREATE TABLE ADM(
	id_adm INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    cpf_adm VARCHAR(11) NOT NULL UNIQUE,
    cargo_adm ENUM("adm","tec"),
    name_adm VARCHAR(30),
    surname_adm VARCHAR(30),
    email_adm VARCHAR(320) NOT NULL UNIQUE,
    senha_adm VARCHAR(20) NOT NULL,
    tel_adm VARCHAR(11) NOT NULL UNIQUE,
    dt_pag_mensal_adm DATE DEFAULT CURRENT_TIMESTAMP,
    dt_cadastro_adm DATETIME DEFAULT CURRENT_TIMESTAMP,
    mens_paga_adm TINYINT(1) DEFAULT 0,
    is_active_adm TINYINT(1) DEFAULT 1
);
DROP TABLE ADM;

CREATE TABLE ASSISTENCIA_T(
	id_at INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_adm_at INT,
	cnpj_at VARCHAR(14) UNIQUE,
	nome_fatasia_at VARCHAR(50),
	razao_social_at VARCHAR(100) UNIQUE,
	email_at VARCHAR(320) UNIQUE,
	telefone_at VARCHAR(11) UNIQUE,
	dt_cadastro_at TINYINT(1) DEFAULT 0,
	is_active_at TINYINT(1) DEFAULT 1,
    CONSTRAINT FK_Assit_Adm FOREIGN KEY (id_adm_at) REFERENCES adm(id_adm)
);

CREATE TABLE TECNICO(
	id_tec INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_adm_tec INT,
    id_at_tec INT,
    name_tec VARCHAR(30),
    surname_tec VARCHAR(45),
    email_tec VARCHAR(320) UNIQUE,
    senha_tec VARCHAR(20) NOT NULL,
    cargo_tec ENUM("adm","operador"),
    dt_cadastro_tec DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active_tec TINYINT(1) DEFAULT 1,
    CONSTRAINT FK_Adm_tec FOREIGN KEY (id_adm_tec) REFERENCES adm(id_adm),
    CONSTRAINT FK_At_tec FOREIGN KEY (id_at_tec) REFERENCES assistencia_t(id_at)
);

CREATE TABLE ORDEM_SERVICO(
	id_os INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_sol_os INT,
	id_tec_os INT,
    id_disp_os INT,
    dt_solicitacao_os DATETIME DEFAULT CURRENT_TIMESTAMP,
    dt_atualizacao_os DATETIME DEFAULT CURRENT_TIMESTAMP,
    dt_entrega_os DATETIME,
    val_orcamento_os DECIMAL(9,2),
    assunto_os VARCHAR(500),
    obs_os VARCHAR(200),
    staus_os ENUM("resolvido","aberto","pendente"),
    CONSTRAINT FK_Sol_OrdemServ FOREIGN KEY (id_sol_os) REFERENCES solicitante(id_solicitante),
    CONSTRAINT FK_Tec_OrdemServ FOREIGN KEY (id_tec_os) REFERENCES tecnico(id_tec),
    CONSTRAINT FK_Disp_OrdemServ FOREIGN KEY (id_disp_os) REFERENCES dispositivo(id_disp)
);

CREATE TABLE ENDERECO(
	id_end INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    cep_end VARCHAR(8) UNIQUE,
    uf_end VARCHAR(2),
    cidade_end VARCHAR(45),
    bairro_end VARCHAR(20),
    lagradouro VARCHAR(100)
);

CREATE TABLE END_SOLICITANTE(
	id_end_sol INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_end_end_sol INT,
    id_sol_end_sol INT,
    CONSTRAINT FK_End_EndSol FOREIGN KEY (id_end_end_sol) REFERENCES endereco(id_end),
    CONSTRAINT FK_Sol_EndSol FOREIGN KEY (id_sol_end_sol) REFERENCES solicitante(id_solicitante)
);

CREATE TABLE END_AT(
	id_end_at INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_end_end_at INT,
    id_at_end_at INT,
    complemento_end_at VARCHAR(45),
    numero_end_at VARCHAR(4),
    CONSTRAINT FK_End_EndAt FOREIGN KEY (id_end_end_at) REFERENCES endereco(id_end),
    CONSTRAINT FK_At_EndAt FOREIGN KEY (id_at_end_at) REFERENCES assistencia_t(id_at)
);

INSERT INTO 
	solicitante
		(
			cpf_solicitante,
            name_solicitante,
            surname_solicitante,
            email_solicitante,
            tel_solicitante
		)
	VALUES
		("12345678910","Geovane","Silverio","gg@gmail.com","2740028922"),
		("10987654321","Elayne","Oper","oper@gmail.com","12345678910"),
        ("98745612301","Dara","User","darara@sollobr.com.br","12332122198")
;
SELECT * FROM solicitante;
	
INSERT INTO 
	dispositivo
		(
			id_solicitante_disp,
            id_hw_disp,
            categ_disp,
            fab_disp,
            marca_disp,
            modelo_disp,
            voltagem_disp
		)
	VALUES
		(1, "861536030196001", "MOVEL", "samsung", "samsung", "Galaxy S 23 FE", " "),
		(2, "33312-66612-77712-12345", "NOTEBOOK", "samsung", "samsung", "GalaxyBook 4", " "),
        (3, "12345-67891-01112-13141", "DESKTOP", "intel", "asus", "sei la man", " ")
;
SELECT * FROM dispositivo;

SELECT 
		concat(s.name_solicitante," ",s.surname_solicitante) as nome_solicitante,
		d.marca_disp,
		d.modelo_disp,
		d.categ_disp
	FROM 
		solicitante as s
    INNER JOIN 
		dispositivo as d
        ON
			s.id_solicitante = d.id_solicitante_disp
;
   
INSERT INTO
	adm
		(
			cpf_adm,
            cargo_adm,
            name_adm,
            surname_adm,
            email_adm,
            tel_adm,
            dt_pag_mensal_adm
        )
	VALUES
		("12345678910","ADM","Amos","Souza","seuamos@sollobr.com.br","08000258000",current_timestamp())
;

SELECT * FROM adm;