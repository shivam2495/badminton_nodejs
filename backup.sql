-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: localhost    Database: badminton
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `player_info_table`
--

DROP TABLE IF EXISTS `player_info_table`;
DROP TABLE IF EXISTS `per_match_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player_info_table` (
  `uname` varchar(20) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `profile_picture` varchar(100) DEFAULT NULL,
  `rank` int(11) DEFAULT '0',
  `matches_played` int(11) DEFAULT '0',
  `avg_backhand` float DEFAULT '25',
  `avg_forehand` float DEFAULT '25',
  `avg_lob` float DEFAULT '25',
  `avg_smash` float DEFAULT '25',
  `avg_dominance` float DEFAULT '0',
  `avg_strokes_per_point` float DEFAULT '0',
  `avg_speed` float DEFAULT '0',
  `avg_react` float DEFAULT '0',
  `avg_frequency` float DEFAULT '0',
  `avg_heart_rate` float DEFAULT '0',
  `avg_calories_burnt` float DEFAULT '0',
  `avg_match_duration` float DEFAULT '0',
  `avg_weight` float DEFAULT '0',
  `latest_video_link` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`uname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `per_match_table` (
  `uname` varchar(20) NOT NULL,
  `match_name` varchar(100) DEFAULT NULL,
  `backhand` float DEFAULT '25',
  `forehand` float DEFAULT '25',
  `lob` float DEFAULT '25',
  `smash` float DEFAULT '25',
  `dominance` float DEFAULT '0',
  `strokes_per_point` float DEFAULT '0',
  `speed` float DEFAULT '0',
  `react` float DEFAULT '0',
  `frequency` float DEFAULT '0',
  `heart_rate` float DEFAULT '0',
  `calories_burnt` float DEFAULT '0',
  `match_duration` float DEFAULT '0',
  `weight` float DEFAULT '0',
  `video_link` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `recommendations` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`uname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_info_table`
--

LOCK TABLES `player_info_table` WRITE;
/*!40000 ALTER TABLE `player_info_table` DISABLE KEYS */;
INSERT INTO `player_info_table` VALUES ('shivam','Shivam Sarkhar','saina07082012.jpg',5,3,25,20,30,25,68,23,1.3,0.8,32,80,400,30,78,'Baun-Augustyn-GrpG-LondonOlympics-2012.mp4');
INSERT INTO `player_info_table` VALUES ('joga','Joga Rao','playerpic3.png',1,2,15,10,55,20,43,63,4.3,0.4,92,75,300,40,68,'Li-Xuerui-Wins-2012-Olympics.mp4');
/*!40000 ALTER TABLE `player_info_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-25 15:02:25
