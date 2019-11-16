The app is a simple shop that consist of server (gem-server) and client parts.


============== SERVER PART ==========================

    * NodeJs
    * sequalize (ORM of PostgreSql)
    * express (NodeJs framework)
    * babel (convert ES6 to ES5)

    Source: https://medium.com/@victorsteven/restful-api-with-nodejs-express-postgresql-sequelize-travis-mocha-coveralls-and-code-climate-f28715f7a014


In order to launch server part run:

    * `npm run dev`


============== PostgreSQL server ======================

    Useful commands:
    * `pg_ctl -D /usr/local/var/postgres start` (start PostgreSQL)
    * `createdb gems` (create database named gems)
    * `sequelize model:create --name Category --attributes title:string,description:string` (create model Category. This should be followed by creating corresponded files in models and migrations directories, than run `sequelize db:migrate`)
