App for downloading weather from the google map - symfony 4.3.2 + react 16.8
==================================

# About app:

   Is is an application  created as a task in recrutation process. 
   Project requirements are included in pdf file in root folder (Polish lang). 

# Requirements
  
  for docker: 
  - Docker engine v1.13 or higher
  - Docker compose v1.12
  
  for app:
  - symfony Requirements : 
     - https://symfony.com/doc/current/reference/requirements.html
  
# How to run

Installation:

  - First, clone this repository
  - If you want to use docker, on the root folder run command: 
  
```bash
$ docker-compose build
$ docker-compose up
```
  
  - next go to app folder and run command:
  
```bash
$ composer install
$ yarn install
$ yarn build
```  
   
  - Databse:
    - check app/.env file to edit DATABASE_URL variable as you want - and if you want. 
	- create databse using symfony migration or manualy by login to phpmyadmin using this adress: http://localhost:8888/
	- create necessary tables using symfony migration or copy sql structure from file db.mwb (workbench file) in root folder and paste to phpmyadmin. 
	
  - visit app on the following url: http://localhost
  

