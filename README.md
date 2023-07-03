<p align="center">
  #ReAnication
</p>

# Introduction
[ReAnication](https://github.com/Ricccck/ReAnication/) is an application designed for live communication during anime broadcasts for everyone who loves anime. This application retrieves and displays the latest anime information from Annict's api. The application also includes a login feature via Jason Web Token. Users have to log in to enter the chat.

# Technologies
[![My Skills](https://skillicons.dev/icons?i=js)](https://skillicons.dev)
JavaScript<br>
socket.io
### Frontend
[![My Skills](https://skillicons.dev/icons?i=react)](https://skillicons.dev)
React<br>
[Annict Api](https://developers.annict.com/), Material UI
### Backend
[![My Skills](https://skillicons.dev/icons?i=nodejs)](https://skillicons.dev)
node.js<br>
[![My Skills](https://skillicons.dev/icons?i=express)](https://skillicons.dev)
express.js<br>
[![My Skills](https://skillicons.dev/icons?i=postgres)](https://skillicons.dev)
PostgreSQL<br>
bcrypt, jsonwebtoken, knex

# Features
* 

#Getting Started in loccal environment
## Need to install & Sign up
* Install [postgresql](https://www.postgresql.org/)
* Get api key from [Annict Developers](https://developers.annict.com/)

###Create ```.env.local``` file in ```./ReAnication``` directory
```
DB_NAME=<your_db_name>
DB_USER=<your_db_username>
DB_PASSWORD=<your_db_password>

ACCESS_TOKEN_SECRET_KEY=<your_jwt_key>
REFRESH_TOKEN_SECRET_KEY=<your_another_jwt_key>
```

###Create ```.env``` file in ```./ReAnication/client``` directory
```
REACT_APP_ACCESS_TOKEN=<your_api_key>
```

## Set up
1. Clone repository to local environment
2. Begin by running the following command in the root folder to install depencies  
```js
npm install
```
3. Create a database for postgreSQL
```
psql
CREATE DATABASE <db_name>
```
4. Create tables and add seed data
```js
npm run migrate:latest
npm run seed:data
```  
5. Create front end environment
```js
npm run build
cd client
```
6. Start servers by separate screens
```js
npm start
```

# Contributer
###Riku Usui<br>
<img src="https://avatars.githubusercontent.com/u/99594245?v=4" width="200px;" alt=""/><br>
[github](https://github.com/Ricccck/), [Linkedin]()

### This app was created during my time as a student at Code Chrysalis.

