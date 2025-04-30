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
  `cpf_solicitante` varchar(11) NOT NULL,
  `name_adm` varchar(30) DEFAULT NULL,
  `surname_adm` varchar(30) DEFAULT NULL,
  `email_adm` varchar(320) NOT NULL,
  `senha_adm` varchar(20) NOT NULL,
  `tel_adm` varchar(11) NOT NULL,
  `dt_pag_mensal_adm` date DEFAULT current_timestamp(),
  `dt_cadastro_adm` datetime DEFAULT current_timestamp(),
  `is_active_adm` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id_adm`),
  UNIQUE KEY `cpf_solicitante` (`cpf_solicitante`),
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
-- Table structure for table `solicitante`
--

DROP TABLE IF EXISTS `solicitante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitante` (
  `id_solicitante` int(11) NOT NULL AUTO_INCREMENT,
  `cpf_solicitante` varchar(11) NOT NULL,
  `name_solicitante` varchar(30) NOT NULL,
  `surname_solicitante` varchar(30) NOT NULL,
  `email_solicitante` varchar(320) NOT NULL,
  `tel_solicitante` varchar(11) DEFAULT NULL,
  `senha_solicitante` varchar(20) NOT NULL,
  `dt_cadastro_solicitante` date NOT NULL DEFAULT current_timestamp(),
  `is_active_solicitante` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id_solicitante`),
  UNIQUE KEY `cpf_solicitante` (`cpf_solicitante`),
  UNIQUE KEY `email_solicitante` (`email_solicitante`),
  UNIQUE KEY `tel_solicitante` (`tel_solicitante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitante`
--

LOCK TABLES `solicitante` WRITE;
/*!40000 ALTER TABLE `solicitante` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitante` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-18  8:51:17
