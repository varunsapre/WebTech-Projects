CREATE DATABASE Bob;
CREATE TABLE `Bob`.`User` (
  `user_id` BIGINT UNIQUE AUTO_INCREMENT,
  `fname` VARCHAR(45) NULL,
  `lname` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(100) NULL,
  PRIMARY KEY (`user_id`));
