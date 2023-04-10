const config = {
    client: 'mysql2',

    connection: {
        host: "localhost",
        user: "cesar",
        password: "admin",
        database: "medcloud",
    },
}

const knex = require('knex')(config);

module.exports = knex