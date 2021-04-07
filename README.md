The app is an example of combining of an express-based server with a react-based client.

============== CLIENT PART ==========================

    * React

============== SERVER PART ==========================

    * NodeJs
    * Sequalize (ORM of PostgreSql)
    * Express (NodeJs framework)
    * Babel (convert ES6 to ES5)


============== MODELS ==========================

    * Gem (has many to many association with Category, Coating, Stone and Metal models)
    * Category
    * User
    * Coating
    * Metal
    * Stone

============== PostgreSQL server ======================

    Useful commands:
    * `pg_ctl -D /usr/local/var/postgres start` (start PostgreSQL)
    * `createdb gems` (create database named gems)
    * `sequelize model:create --name Category --attributes title:string,description:string` (create model Category. This should be followed by creating corresponded files in models and migrations directories, than run `sequelize db:migrate`)
