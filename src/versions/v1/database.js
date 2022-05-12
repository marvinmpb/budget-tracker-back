const { Pool } = require('pg');

const client = new Pool({
  connectionString: 'postgres://hoinbmgkaljqco:bd033ab296a8c915a8816bdeb86ce3e7a95bcccba0ee15b2b1bd949714ca3de3@ec2-54-75-184-144.eu-west-1.compute.amazonaws.com:5432/d3t4q5e1lnpa07',
  ssl: { rejectUnauthorized: false },
});

module.exports = { client };
