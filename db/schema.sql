DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
d_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (d_id)
REFERENCES department (id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
m_id INT,
PRIMARY KEY (id),
FOREIGN KEY (role_id)
REFERENCES role (id),
FOREIGN KEY (m_id) 
REFERENCES employee (id)
);

SELECT * from employee;


