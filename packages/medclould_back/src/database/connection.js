const config = {
    client: 'mysql2',

    connection: {
        host: "medcloud.cksqvlsjpsrb.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: "Cesar280197",
        database: "medcloud",
    },
};

const knex = require('knex')(config);

module.exports = knex;