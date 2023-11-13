# Categorized TODO list with authentication
One day, I decided to enhance my programming skills in a different stack. I chose to learn a popular backend framework by relying solely on articles and videos found through a search engine. As a result, I successfully developed my first Node.js application. This project is **not fully-featured** and has many potential areas for improvement, and it is just a demonstration of the new knowledge I acquired.

This web application allows users to create and edit a TODO list. Each item can be categorized. Additionally, authentication and authorization have been implemented, allowing you to create your account. 

Used Node.js libs:
- Express.js
- Passport.js
- Sequelize (Postgres)
- Swagger
- BCrypt
- Morgan

## Running
Create file `config.env` in root folder with your credentials. 
```
PGUSER=***
PGPASSWORD=***
PGHOST=localhost
PGDATABASE=postgres
PGPORT=5432
```
Run
```
npm start
```
Dev run (with nodemon)
```
npm run dev
```
Documentation available at the URL
```
http://localhost:5000/api-docs/
```