require("dotenv").config({ path: "../.env.local", debug: true });

const environment = process.env.NODE_ENV;
const config = require("./knexfile");
const knex = require("knex")(config[environment]);

module.exports = knex;
