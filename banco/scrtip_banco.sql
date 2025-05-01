create DATABASE tcc_db;
use tcc_db;
DROP DATABASE tcc_db;

-- tirar endereço multiplo
-- gestor solicitou suspender a criacao de operador por enquanto
-- focar em demanda

CREATE TABLE ENDERECO(
	id_endereco INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    cep_end VARCHAR(8) UNIQUE,
    uf_end VARCHAR(2),
    cidade_end VARCHAR(45),
    bairro_end VARCHAR(20),
    lagradouro VARCHAR(100)
);

CREATE TABLE SOLICITANTE(
	id_solicitante INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_endereco_solicitante INT,
    tipo_user_solicitante INT(1) DEFAULT 1,
    cpf_solicitante VARCHAR(11) NOT NULL UNIQUE,
    name_solicitante VARCHAR(30) NOT NULL,
    surname_solicitante VARCHAR(30) NOT NULL,
    email_solicitante VARCHAR(320) NOT NULL UNIQUE,
	tel_solicitante VARCHAR(11),
    senha_solicitante VARCHAR(20) NOT NULL,
    dt_cadastro_solicitante DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active_solicitante INT(1) DEFAULT 1, -- 1 ATIVO 0 INATIVO
    CONSTRAINT FK_Endereco_Solicitante FOREIGN KEY (id_endereco_solicitante) REFERENCES endereco(id_endereco)
);
DROP TABLE solicitante;

CREATE TABLE DISPOSITIVO(
	id_dispositivo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_solicitante_dispositivo INT,
    identificador_dispositivo VARCHAR(23) UNIQUE,
    categ_disp ENUM('CELULAR', 'TABLET', 'NOTEBOOK', 'CONSOLE', 'DESKTOP', 'OUTRO'),
    fab_dispositivo VARCHAR(45),
    marca_dispositivo VARCHAR(45),
    modelo_dispositivo VARCHAR(30),
    cor_dispositivo VARCHAR(20),
    amperagem_dispositivo VARCHAR(5),
    voltagem_dispositivo VARCHAR(5),
    dt_cad_dispositivo DATETIME DEFAULT CURRENT_TIMESTAMP, -- analisando utilidade
	CONSTRAINT FK_Dispositivo_Solicitante FOREIGN KEY (id_solicitante_dispositivo) REFERENCES solicitante(id_solicitante)
); 
DROP TABLE dispositivo;

CREATE TABLE ADM(
	id_adm INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    tipo_user_adm INT(1) DEFAULT 2, -- permissao de user
    cpf_adm VARCHAR(11) NOT NULL UNIQUE,
    name_adm VARCHAR(30),
    surname_adm VARCHAR(30),
    email_adm VARCHAR(320) NOT NULL UNIQUE,
    senha_adm VARCHAR(20) NOT NULL,
    tel_adm VARCHAR(11) NOT NULL UNIQUE,
    dt_pag_mensal_adm DATE DEFAULT CURRENT_TIMESTAMP,
    dt_cadastro_adm DATETIME DEFAULT CURRENT_TIMESTAMP,
    mens_paga_adm INT(1) DEFAULT 0,
    is_active_adm INT(1) DEFAULT 1
);
DROP TABLE ADM;

CREATE TABLE ASSISTENCIA_T(
	id_at INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_adm_at INT,
    id_endereco_assist INT,
	cnpj_at VARCHAR(14) UNIQUE,
	nome_fatasia_at VARCHAR(50) UNIQUE,
	razao_social_at VARCHAR(100) UNIQUE,
	email_at VARCHAR(320) UNIQUE,
	telefone_at VARCHAR(11) UNIQUE,
	dt_cadastro_at TINYINT(1) DEFAULT 0,
	is_active_at TINYINT(1) DEFAULT 1,
    CONSTRAINT FK_Assist_Administrador FOREIGN KEY (id_adm_at) REFERENCES adm(id_adm),
    CONSTRAINT FK_Assist_Endereco FOREIGN KEY (id_endereco_assist) REFERENCES endereco(id_endereco)
);
DROP TABLE ASSISTENCIA_T;

CREATE TABLE TECNICO(
	id_tec INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_adm_tec INT,
    id_at_tec INT,
    tipo_user_tec INT(1) DEFAULT 3,
    cpf_tec VARCHAR(11) UNIQUE,
    name_tec VARCHAR(30),
    surname_tec VARCHAR(45),
    email_tec VARCHAR(320) UNIQUE,
    senha_tec VARCHAR(20) NOT NULL,
    dt_cadastro_tec DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active_tec TINYINT(1) DEFAULT 1,
    CONSTRAINT FK_Adm_tec FOREIGN KEY (id_adm_tec) REFERENCES adm(id_adm),
    CONSTRAINT FK_At_tec FOREIGN KEY (id_at_tec) REFERENCES assistencia_t(id_at)
);

CREATE TABLE ORDEM_SERVICO(
	id_os INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_solicitante_os INT,
	id_adm_os INT,
    id_dispositivo_os INT,
    id_assistencia_os INT,
    id_responsavel_os INT,
    dt_solicitacao_os DATETIME DEFAULT CURRENT_TIMESTAMP, -- data em que demanda foi emitida
    dt_atualizacao_os DATETIME DEFAULT CURRENT_TIMESTAMP,
    dt_prazo_os DATETIME, -- prazo definido para entrega
    val_orcamento_os INT, -- definido como int para maior precisao do registro do valor, partindo da base em que o valor será armazenado em centavo, deixando assim a conversao do valor de forma externa
    assunto_os VARCHAR(500),
    obs_os VARCHAR(200),
    staus_os ENUM("resolvido","aberto","pendente"),
    CONSTRAINT FK_Solicitante_OrdemServ FOREIGN KEY (id_solicitante_os) REFERENCES SOLICITANTE(id_solicitante),
    CONSTRAINT FK_Adm_OrdemServ FOREIGN KEY (id_adm_os) REFERENCES ADM(id_adm),
    CONSTRAINT FK_Dispositivo_OrdemServ FOREIGN KEY (id_dispositivo_os) REFERENCES DISPOSITIVO(id_dispositivo),
    CONSTRAINT FK_Assistencia_OrdemServ FOREIGN KEY (id_assistencia_os) REFERENCES ASSISTENCIA_T(id_at)
);

ALTER TABLE ORDEM_SERVICO
	MODIFY COLUMN val_orcamento_os INT; 

CREATE TABLE ACESSO_TEC_OS(
	id_acesso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_tec_acesso_tec_os INT,
    id_os_acesso_tec_os INT,
    dt_ultimo_acesso DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Tecnico_acesso_tec_os FOREIGN KEY (id_tec_acesso_tec_os) REFERENCES tecnico(id_tec),
    CONSTRAINT FK_OrdemServ_acesso_tec_os FOREIGN KEY (id_os_acesso_tec_os) REFERENCES ORDEM_SERVICO(id_os)
);
DROP TABLE ACESSO_TEC_OS;

CREATE TABLE AVALIACAO_SOLIC_ASSIST(
	id_avaliacao_solic_assist INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_solicitante_avaliacao INT,
    id_assistencia_avaliacao INT,
    feedback_avaliacao_solic_assist VARCHAR(100),
    nota_satisfacao_avaliacao_solic_assistencia ENUM("1","2","3","4","5"), -- talvez aumentar para 10
    CONSTRAINT FK_Solicitante_avaliacao FOREIGN KEY (id_solicitante_avaliacao) REFERENCES solicitante(id_solicitante),
    CONSTRAINT FK_Assistencia_avaliacao FOREIGN KEY (id_assistencia_avaliacao) REFERENCES assistencia_t(id_at)
);
DROP TABLE AVALIACAO_SOLIC_ASSIST;

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