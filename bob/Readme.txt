--Installing mysql components-- 
sudo apt-get update
sudo apt-get install mysql-server

--Installing flask components--
sudo pip2 install flask 
sudo pip2 install flask-mysql

--Installing Mutagen for MP3 recognition--
sudo pip2 install mutagen

--Setting up DB--
$ mysql -u root -p
	<enter password>

mysql>	CREATE DATABASE BOB;

mysql> CREATE TABLE `Bob`.`User` (
	`user_id` BIGINT UNIQUE AUTO_INCREMENT,
  	`fname` VARCHAR(45) NULL,
  	`lname` VARCHAR(45) NULL,
  	`email` VARCHAR(45) NULL,
  	`password` VARCHAR(100) NULL,
  	PRIMARY KEY (`user_id`));


--Running the code--
$ python2 app.py

--Accessing webpage--

localhost:5000 
OR
127.0.0.1:5000