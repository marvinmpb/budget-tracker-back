const { Pool } = require('pg');

const client = new Pool({
  connectionString: process.env.PG_HEROKU_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = { client };
