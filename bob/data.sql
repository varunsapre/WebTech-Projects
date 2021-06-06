CREATE DATABASE bob;
CREATE TABLE `bob`.`User` (
  `user_id` BIGINT UNIQUE AUTO_INCREMENT,
  `fname` VARCHAR(45) NULL,
  `lname` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(110) NULL,
  PRIMARY KEY (`user_id`));
