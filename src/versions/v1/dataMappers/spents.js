/* eslint-disable no-param-reassign */
const { client } = require('../database');

module.exports = {
  create: async (data) => {
    if (data.date) data.date = new Date(data.date);
    const result = await client.query('SELECT * FROM create_spent($1)', [data]);
    return result.rows[0];
  },

  /**
   * @param { number } accountId
   * @param { number } spentId
   */
  delete: async (accountId, spentId) => {
    await client.query('DELETE FROM "spent" WHERE "id" = $1 AND "account_id" = $2', [spentId, accountId]);
  },

  getAll: async (accountId) => {
    const result = await client.query('SELECT * FROM "spent_view" WHERE "accountId" = $1', [accountId]);
    return result.rows;
  },

  /**
   * @param { number } accountId
   * @param { number } categoryId
   * @returns
   */
  getAllByCategory: async (accountId, categoryId) => {
    const result = await client.query('SELECT * FROM "spent_view" WHERE "id" = $1 AND "categoryId" = $2', [accountId, categoryId]);
    return result.rows;
  },

  /**
   * @param { number } accountId
   * @param { number } spentId
   * @returns
   */
  getOne: async (accountId, spentId) => {
    const result = await client.query('SELECT * FROM "spent_view" WHERE "id" = $1 AND "accountId" = $2', [spentId, accountId]);
    return result.rows[0];
  },
};