CREATE DATABASE  IF NOT EXISTS `tcc_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `tcc_db`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tcc_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adm`
--

DROP TABLE IF EXISTS `adm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adm` (
  `id_adm` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_user_adm` int(1) DEFAULT 2,
  `cpf_adm` varchar(11) NOT NULL,
  `name_adm` varchar(30) DEFAULT NULL,
  `surname_adm` varchar(30) DEFAULT NULL,
  `email_adm` varchar(320) NOT NULL,
  `senha_adm` varchar(20) NOT NULL,
  `tel_adm` varchar(11) NOT NULL,
  `dt_pag_mensal_adm` date DEFAULT current_timestamp(),
  `dt_cadastro_adm` datetime DEFAULT current_timestamp(),
  `mens_paga_adm` int(1) DEFAULT 0,
  `is_active_adm` int(1) DEFAULT 1,
  PRIMARY KEY (`id_adm`),
  UNIQUE KEY `cpf_adm` (`cpf_adm`),
  UNIQUE KEY `email_adm` (`email_adm`),
  UNIQUE KEY `tel_adm` (`tel_adm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adm`
--

LOCK TABLES `adm` WRITE;
/*!40000 ALTER TABLE `adm` DISABLE KEYS */;
/*!40000 ALTER TABLE `adm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assistencia_t`
--

DROP TABLE IF EXISTS `assistencia_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assistencia_t` (
  `id_at` int(11) NOT NULL AUTO_INCREMENT,
  `id_adm_at` int(11) DEFAULT NULL,
  `id_endereco_assist` int(11) DEFAULT NULL,
  `cnpj_at` varchar(14) DEFAULT NULL,
  `nome_fatasia_at` varchar(50) DEFAULT NULL,
  `razao_social_at` varchar(100) DEFAULT NULL,
  `email_at` varchar(320) DEFAULT NULL,
  `telefone_at` varchar(11) DEFAULT NULL,
  `dt_cadastro_at` tinyint(1) DEFAULT 0,
  `is_active_at` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id_at`),
  UNIQUE KEY `cnpj_at` (`cnpj_at`),
  UNIQUE KEY `nome_fatasia_at` (`nome_fatasia_at`),
  UNIQUE KEY `razao_social_at` (`razao_social_at`),
  UNIQUE KEY `email_at` (`email_at`),
  UNIQUE KEY `telefone_at` (`telefone_at`),
  KEY `FK_Assist_Administrador` (`id_adm_at`),
  KEY `FK_Assist_Endereco` (`id_endereco_assist`),
  CONSTRAINT `FK_Assist_Administrador` FOREIGN KEY (`id_adm_at`) REFERENCES `adm` (`id_adm`),
  CONSTRAINT `FK_Assist_Endereco` FOREIGN KEY (`id_endereco_assist`) REFERENCES `endereco` (`id_endereco`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assistencia_t`
--

LOCK TABLES `assistencia_t` WRITE;
/*!40000 ALTER TABLE `assistencia_t` DISABLE KEYS */;
/*!40000 ALTER TABLE `assistencia_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacao_solic_assist`
--

DROP TABLE IF EXISTS `avaliacao_solic_assist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacao_solic_assist` (
  `id_avaliacao_solic_assist` int(11) NOT NULL AUTO_INCREMENT,
  `id_solicitante_avaliacao` int(11) DEFAULT NULL,
  `id_assistencia_avaliacao` int(11) DEFAULT NULL,
  `feedback_avaliacao_solic_assist` varchar(100) DEFAULT NULL,
  `nota_satisfacao_avaliacao_solic_assistencia` enum('1','2','3','4','5') DEFAULT NULL,
  PRIMARY KEY (`id_avaliacao_solic_assist`),
  KEY `FK_Solicitante_avaliacao` (`id_solicitante_avaliacao`),
  KEY `FK_Assistencia_avaliacao` (`id_assistencia_avaliacao`),
  CONSTRAINT `FK_Assistencia_avaliacao` FOREIGN KEY (`id_assistencia_avaliacao`) REFERENCES `assistencia_t` (`id_at`),
  CONSTRAINT `FK_Solicitante_avaliacao` FOREIGN KEY (`id_solicitante_avaliacao`) REFERENCES `solicitante` (`id_solicitante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacao_solic_assist`
--

LOCK TABLES `avaliacao_solic_assist` WRITE;
/*!40000 ALTER TABLE `avaliacao_solic_assist` DISABLE KEYS */;
/*!40000 ALTER TABLE `avaliacao_solic_assist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dispositivo`
--

DROP TABLE IF EXISTS `dispositivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dispositivo` (
  `id_dispositivo` int(11) NOT NULL AUTO_INCREMENT,
  `id_solicitante_dispositivo` int(11) DEFAULT NULL,
  `identificador_dispositivo` varchar(23) DEFAULT NULL,
  `categ_disp` enum('CELULAR','TABLET','NOTEBOOK','CONSOLE','DESKTOP','OUTRO') DEFAULT NULL,
  `fab_dispositivo` varchar(45) DEFAULT NULL,
  `marca_dispositivo` varchar(45) DEFAULT NULL,
  `modelo_dispositivo` varchar(30) DEFAULT NULL,
  `cor_dispositivo` varchar(20) DEFAULT NULL,
  `amperagem_dispositivo` varchar(5) DEFAULT NULL,
  `voltagem_dispositivo` varchar(5) DEFAULT NULL,
  `dt_cad_dispositivo` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id_dispositivo`),
  UNIQUE KEY `identificador_dispositivo` (`identificador_dispositivo`),
  KEY `FK_Dispositivo_Solicitante` (`id_solicitante_dispositivo`),
  CONSTRAINT `FK_Dispositivo_Solicitante` FOREIGN KEY (`id_solicitante_dispositivo`) REFERENCES `solicitante` (`id_solicitante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispositivo`
--

LOCK TABLES `dispositivo` WRITE;
/*!40000 ALTER TABLE `dispositivo` DISABLE KEYS */;
/*!40000 ALTER TABLE `dispositivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco`
--

DROP TABLE IF EXISTS `endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endereco` (
  `id_endereco` int(11) NOT NULL AUTO_INCREMENT,
  `cep_end` varchar(8) DEFAULT NULL,
  `uf_end` varchar(2) DEFAULT NULL,
  `cidade_end` varchar(45) DEFAULT NULL,
  `bairro_end` varchar(20) DEFAULT NULL,
  `lagradouro` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_endereco`),
  UNIQUE KEY `cep_end` (`cep_end`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco`
--

LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordem_servico`
--

DROP TABLE IF EXISTS `ordem_servico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordem_servico` (
  `id_os` int(11) NOT NULL AUTO_INCREMENT,
  `id_solicitante_os` int(11) DEFAULT NULL,
  `id_adm_os` int(11) DEFAULT NULL,
  `id_dispositivo_os` int(11) DEFAULT NULL,
  `id_assistencia_os` int(11) DEFAULT NULL,
  `id_responsavel_os` int(11) DEFAULT NULL,
  `dt_solicitacao_os` datetime DEFAULT current_timestamp(),
  `dt_atualizacao_os` datetime DEFAULT current_timestamp(),
  `dt_prazo_os` datetime DEFAULT NULL,
  `val_orcamento_os` decimal(9,2) DEFAULT NULL,
  `assunto_os` varchar(500) DEFAULT NULL,
  `obs_os` varchar(200) DEFAULT NULL,
  `staus_os` enum('resolvido','aberto','pendente') DEFAULT NULL,
  PRIMARY KEY (`id_os`),
  KEY `FK_Solicitante_OrdemServ` (`id_solicitante_os`),
  KEY `FK_Adm_OrdemServ` (`id_adm_os`),
  KEY `FK_Dispositivo_OrdemServ` (`id_dispositivo_os`),
  KEY `FK_Assistencia_OrdemServ` (`id_assistencia_os`),
  CONSTRAINT `FK_Adm_OrdemServ` FOREIGN KEY (`id_adm_os`) REFERENCES `adm` (`id_adm`),
  CONSTRAINT `FK_Assistencia_OrdemServ` FOREIGN KEY (`id_assistencia_os`) REFERENCES `assistencia_t` (`id_at`),
  CONSTRAINT `FK_Dispositivo_OrdemServ` FOREIGN KEY (`id_dispositivo_os`) REFERENCES `dispositivo` (`id_dispositivo`),
  CONSTRAINT `FK_Solicitante_OrdemServ` FOREIGN KEY (`id_solicitante_os`) REFERENCES `solicitante` (`id_solicitante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordem_servico`
--

LOCK TABLES `ordem_servico` WRITE;
/*!40000 ALTER TABLE `ordem_servico` DISABLE KEYS */;
/*!40000 ALTER TABLE `ordem_servico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitante`
--

DROP TABLE IF EXISTS `solicitante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitante` (
  `id_solicitante` int(11) NOT NULL AUTO_INCREMENT,
  `id_endereco_solicitante` int(11) DEFAULT NULL,
  `tipo_user_solicitante` int(1) DEFAULT 1,
  `cpf_solicitante` varchar(11) NOT NULL,
  `name_solicitante` varchar(30) NOT NULL,
  `surname_solicitante` varchar(30) NOT NULL,
  `email_solicitante` varchar(320) NOT NULL,
  `tel_solicitante` varchar(11) DEFAULT NULL,
  `senha_solicitante` varchar(20) NOT NULL,
  `dt_cadastro_solicitante` date NOT NULL DEFAULT current_timestamp(),
  `is_active_solicitante` int(1) DEFAULT 1,
  PRIMARY KEY (`id_solicitante`),
  UNIQUE KEY `cpf_solicitante` (`cpf_solicitante`),
  UNIQUE KEY `email_solicitante` (`email_solicitante`),
  KEY `FK_Endereco_Solicitante` (`id_endereco_solicitante`),
  CONSTRAINT `FK_Endereco_Solicitante` FOREIGN KEY (`id_endereco_solicitante`) REFERENCES `endereco` (`id_endereco`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitante`
--

LOCK TABLES `solicitante` WRITE;
/*!40000 ALTER TABLE `solicitante` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tecnico`
--

DROP TABLE IF EXISTS `tecnico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tecnico` (
  `id_tec` int(11) NOT NULL AUTO_INCREMENT,
  `id_adm_tec` int(11) DEFAULT NULL,
  `id_at_tec` int(11) DEFAULT NULL,
  `tipo_user_tec` int(1) DEFAULT 3,
  `cpf_tec` varchar(11) DEFAULT NULL,
  `name_tec` varchar(30) DEFAULT NULL,
  `surname_tec` varchar(45) DEFAULT NULL,
  `email_tec` varchar(320) DEFAULT NULL,
  `senha_tec` varchar(20) NOT NULL,
  `dt_cadastro_tec` datetime DEFAULT current_timestamp(),
  `is_active_tec` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id_tec`),
  UNIQUE KEY `cpf_tec` (`cpf_tec`),
  UNIQUE KEY `email_tec` (`email_tec`),
  KEY `FK_Adm_tec` (`id_adm_tec`),
  KEY `FK_At_tec` (`id_at_tec`),
  CONSTRAINT `FK_Adm_tec` FOREIGN KEY (`id_adm_tec`) REFERENCES `adm` (`id_adm`),
  CONSTRAINT `FK_At_tec` FOREIGN KEY (`id_at_tec`) REFERENCES `assistencia_t` (`id_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tecnico`
--

LOCK TABLES `tecnico` WRITE;
/*!40000 ALTER TABLE `tecnico` DISABLE KEYS */;
/*!40000 ALTER TABLE `tecnico` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-01  2:04:50
