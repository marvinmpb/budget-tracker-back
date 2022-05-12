const { client } = require('../database');

module.exports = {
  create: async (data) => {
    const result = await client.query('SELECT * FROM create_account($1)', [data]);
    return result.rows[0];
  },

  /**
   * @param { number } id
   */
  delete: async (id) => {
    await client.query('DELETE FROM "account" WHERE "id" = $1', [id]);
  },

  /**
   * @param { number } id
   */
  getOne: async (id) => {
    const result = await client.query('SELECT * FROM "account_view" WHERE "id" = $1', [id]);
    return result.rows[0];
  },

  /**
   * @param { number } id
   * @param { object } data
   * @returns
   */
  update: async (id, data) => {
    const result = await client.query('SELECT * FROM update_account($1)', [{ ...data, id: Number(id) }]);
    return result.rows[0];
  },
};
