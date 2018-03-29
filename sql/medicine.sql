/*
SQLyog v10.2 
MySQL - 5.5.53 : Database - my
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`my` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `my`;

/*Table structure for table `inorder` */

DROP TABLE IF EXISTS `inorder`;

CREATE TABLE `inorder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(12) DEFAULT NULL COMMENT '明码编号',
  `number` varchar(12) DEFAULT NULL COMMENT '批次',
  `name` varchar(50) DEFAULT NULL COMMENT '药品名称',
  `type` varchar(12) DEFAULT NULL COMMENT '药品种类',
  `unit` varchar(12) DEFAULT NULL COMMENT '计量单位',
  `made_date` date DEFAULT NULL COMMENT '生产日期',
  `useless_date` date DEFAULT NULL COMMENT '过期日期',
  `input_date` date DEFAULT NULL COMMENT '进货日期',
  `input_com` varchar(50) DEFAULT NULL COMMENT '进货公司',
  `price` double DEFAULT NULL COMMENT '药品单价',
  `incount` int(11) DEFAULT NULL COMMENT '药品数量',
  `operator` int(11) DEFAULT NULL COMMENT '操作员编号',
  `brief` varchar(50) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `inorder` */

insert  into `inorder`(`id`,`code`,`number`,`name`,`type`,`unit`,`made_date`,`useless_date`,`input_date`,`input_com`,`price`,`incount`,`operator`,`brief`) values (1,'1','1','1','1','2','2018-03-05','2018-03-21','2018-03-06','1',1,1,NULL,NULL);

/*Table structure for table `operator` */

DROP TABLE IF EXISTS `operator`;

CREATE TABLE `operator` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL COMMENT '账号',
  `password` varchar(20) DEFAULT NULL COMMENT '账户密码',
  `class` int(2) DEFAULT NULL COMMENT '用户类型',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='管理员表';

/*Data for the table `operator` */

insert  into `operator`(`id`,`username`,`password`,`class`) values (1,'12','12',1),(2,'1','13',2),(6,'123','3',NULL);

/*Table structure for table `outorder` */

DROP TABLE IF EXISTS `outorder`;

CREATE TABLE `outorder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(12) DEFAULT NULL COMMENT '编号',
  `operator` varchar(12) DEFAULT NULL COMMENT '出库操作员',
  `output_date` date DEFAULT NULL COMMENT '出库日期',
  `name` varchar(12) DEFAULT NULL COMMENT '出库药品名称',
  `type` varchar(12) DEFAULT NULL COMMENT '出库药品种类',
  `price` double DEFAULT NULL COMMENT '出库价格',
  `outcount` int(11) DEFAULT NULL COMMENT '出库数量',
  `isOut` tinyint(1) DEFAULT NULL COMMENT '是否出库',
  `brief` varchar(200) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `outorder` */

/*Table structure for table `store` */

DROP TABLE IF EXISTS `store`;

CREATE TABLE `store` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(12) NOT NULL COMMENT '药品编号',
  `number` varchar(12) NOT NULL COMMENT '批次编号',
  `name` varchar(20) NOT NULL COMMENT '药品名称',
  `type` varchar(20) NOT NULL COMMENT '药品种类',
  `made_date` date NOT NULL COMMENT '生产日期',
  `useless_date` date NOT NULL COMMENT '过期日期',
  `unit` varchar(20) NOT NULL COMMENT '计算单位',
  `price` double NOT NULL COMMENT '药品进货单价',
  `count` int(11) NOT NULL COMMENT '药品数量',
  `store_date` date DEFAULT NULL COMMENT '修改时间',
  `operator` varchar(50) DEFAULT NULL COMMENT '操作员编号',
  `update_date` date DEFAULT NULL COMMENT '最后一次更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `store` */

insert  into `store`(`id`,`code`,`number`,`name`,`type`,`made_date`,`useless_date`,`unit`,`price`,`count`,`store_date`,`operator`,`update_date`) values (1,'1','1','1','1','2018-03-01','2018-03-28','1',1,1,'2018-03-27','0','2018-03-22'),(7,'2','','','','0000-00-00','0000-00-00','',0,0,NULL,NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
