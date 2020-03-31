const knex = require('knex');
const configuration = require('../../knexfile');

let config = configuration.production;

if (process.env.NODE_ENV === 'test') {
    config = configuration.test;
}

else if (process.env.NODE_ENV === 'development') {
    config = configuration.development;
}

const connection = knex(config);

module.exports = connection;