# < bob >

< bob > is a music player that enables you to browse music while still listening to your favourtie tracks.
This was made for an Adv. Web Technologies course.
Flask and MySQL is used to handle the Backend and Databases.
HTML, CSS, JS, Materialize.js, Jinja2.0 were used for the front end.

Some functionality choices may not make sense while hosting this on your own system (such as delay in loading images), this was done to demonstrate certain techniques used to handle slower connections.

Steps to get this running on your system:

## --Installing mysql components-- 
sudo apt-get update
sudo apt-get install mysql-server

## --Installing flask components--
sudo pip2 install flask 
sudo pip2 install flask-mysql

## --Installing Mutagen for MP3 recognition--
sudo pip2 install mutagen

## --Setting up DB--
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


## --Running the code--
$ python2 app.py

## --Accessing webpage--

localhost:5000 
OR
127.0.0.1:5000

**Note: This was tested only on Linux and works best on Mozilla Firefox. Chrome and Flask do not like each other.**
