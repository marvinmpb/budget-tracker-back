const bcrypt = require('bcrypt');
const { client } = require('../database');
const APIError = require('../errors/APIError');

module.exports = {
  get: async (email, password) => {
    const result = await client.query('SELECT * FROM "account_view" WHERE "email" = $1', [email]);
    const row = result.rows[0];
    if (!row) throw new APIError({ code: 400, message: 'password or email not valid' });

    const match = await bcrypt.compare(password, row.password);
    if (!match) throw new APIError({ code: 400, message: 'password or email not valid' });

    row.password = null;

    return row;
  },
};
