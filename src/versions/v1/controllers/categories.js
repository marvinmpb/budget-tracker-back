const dataMapper = require('../dataMappers/categories');

module.exports = {
  /**
   * @param { import('express').Request } req
   * @param { import('express').Response } res
   */
  create: async (req, res) => {
    const result = await dataMapper.create({ ...req.body, accountId: req.user.accountId });
    res.status(201).json(result);
  },

  /**
   * @param { import('express').Request } req
   * @param { import('express').Response } res
   */
  delete: async (req, res) => {
    await dataMapper.delete(req.user.accountId, Number(req.params.id));
    res.status(204).json(null);
  },

  /**
   * @param { import('express').Request } req
   * @param { import('express').Response } res
   */
  getAll: async (req, res) => {
    const results = await dataMapper.getAll(req.user.accountId);
    res.status(200).json(results);
  },

  /**
   * @param { import('express').Request } req
   * @param { import('express').Response } res
   */
  getOne: async (req, res) => {
    const result = await dataMapper.getOne(req.user.accountId, Number(req.params.id));
    res.status(200).json(result);
  },

  /**
   * @param { import('express').Request } req
   * @param { import('express').Response } res
   */
  update: async (req, res) => {
    const result = await dataMapper.update(req.user.accountId, Number(req.params.id), req.body);
    res.status(200).json(result);
  },
};
