const { client } = require('../database');

module.exports = {
  create: async (data) => {
    const result = await client.query('SELECT * FROM create_category($1)', [data]);
    return result.rows[0];
  },

  /**
   * @param { number } accountId
   * @param { number } categoryId
   */
  delete: async (accountId, categoryId) => {
    await client.query('DELETE FROM "category" WHERE "id" = $1 AND "account_id" = $2', [categoryId, accountId]);
  },

  getAll: async (accountId) => {
    const result = await client.query('SELECT * FROM "category_view" WHERE "accountId" = $1 OR "accountId" IS NULL;', [accountId]);
    return result.rows;
  },

  /**
   * @param { number } accountId
   * @param { number } categoryId
   * @returns
   */
  getOne: async (accountId, categoryId) => {
    const result = await client.query(`
      SELECT * 
      FROM "category_view" 
      WHERE "id" = $1 AND ("accountId" = $2 OR "accountId" IS NULL)
    `, [categoryId, accountId]);

    return result.rows[0];
  },

  /**
   * @param { number } id
   * @param { object } data
   * @returns
   */
  update: async (accountId, categoryId, data) => {
    const result = await client.query('SELECT * FROM update_category($1)', [{ ...data, id: categoryId, accountId }]);
    return result.rows[0];
  },
};
