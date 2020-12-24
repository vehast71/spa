-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               5.6.26 - MySQL Community Server (GPL)
-- ОС Сервера:                   Win32
-- HeidiSQL Версия:              9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Дамп структуры для таблица test_spa.mytable
DROP TABLE IF EXISTS `mytable`;
CREATE TABLE IF NOT EXISTS `mytable` (
  `date` datetime DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `r` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='4 columns';

-- Дамп данных таблицы test_spa.mytable: ~3 rows (приблизительно)
DELETE FROM `mytable`;
/*!40000 ALTER TABLE `mytable` DISABLE KEYS */;
INSERT INTO `mytable` (`date`, `name`, `count`, `r`) VALUES
	('2020-12-23 12:36:02', 'name1', 30, 100.00),
	('2020-12-23 12:36:39', 'name2', 20, 300.00),
	('2020-12-23 12:36:56', 'name3', 10, 200.50),
	('2020-12-24 00:12:38', 'name4\r\n', 40, 123.50),
	('2020-12-24 00:13:52', 'name5', 50, 123.45);
/*!40000 ALTER TABLE `mytable` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
