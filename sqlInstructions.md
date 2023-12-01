STEP 1: Install and run MySQL 
sudo apt update 
sudo apt install mysql-server 
sudo systemctl start mysql.service 
sudo systemctl status mysql 
sudo mysql 

STEP 2: Create a database, then create a table and populate it with data. 
create database teslaDB; 
use teslaDB; 
CREATE TABLE Vehicles (VehicleID int, LastName varchar(255)); 
insert into Vehicles (VehicleID, LastName) values (123,'Hohman'); 

STEP 3: Create a user and grant all permissions, edit bind address 
CREATE USER 'tesla'@'%' IDENTIFIED BY 'Tesla123'; 
grant all on *.* to 'tesla'@'%'; 
flush privileges; 
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf 
Change bind-address to 0.0.0.0 
sudo systemctl restart mysql 
sudo mysql 

STEP 4: Add port 3306 into inbound rules on AWS with source set as Server 2’s IP Address 

Step 5: Connect to database using Sequel Ace 
Host: 18.206.103.215 
Username: tesla 
Password: Tesla123 
