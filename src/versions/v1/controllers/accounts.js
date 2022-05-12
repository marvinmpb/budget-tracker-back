const bcrypt = require('bcrypt');
const { unlinkSync, writeFileSync, existsSync } = require('fs');
const path = require('path');

const dataMapper = require('../dataMappers/accounts');
const APIError = require('../errors/APIError');

module.exports = {
  /**
   * @param { import('express').Request } req
   * @param { import('express').Response } res
   */
  create: async (req, res) => {
    const data = req.body;
    data.password = await bcrypt.hash(data.password, 10);

    const result = await dataMapper.create(data);
    result.password = null;

    res.status(201).json(result);
  },

  /**
   * @param { import('express').Request } req
   * @param { import('express').Response } res
   */
  delete: async (req, res) => {
    await dataMapper.delete(Number(req.params.id));
    res.status(204).json(null);
  },

  /**
   * @param { import('express').Request } req
   * @param { import('express').Response } res
   */
  getOne: async (req, res) => {
    const result = await dataMapper.getOne(Number(req.params.id));
    result.password = null;

    res.status(200).json(result);
  },

  /**
   * @param { import('express').Request } req
   * @param { import('express').Response } res
   */
  getOneByToken: async (req, res) => {
    const result = await dataMapper.getOne(req.user.accountId);
    result.password = null;

    res.status(200).json(result);
  },

  /**
   * @param { import('express').Request } req
   * @param { import('express').Response } res
   */
  update: async (req, res) => {
    const data = req.body;
    if (data.password) data.password = await bcrypt.hash(data.password, 10);

    if (req.file) {
      if (!req.file.originalname.endsWith('.png')) throw new APIError({ code: 400, message: 'avatar must be png file' });
      writeFileSync(path.join(process.cwd(), 'static/avatars', `${req.user.accountId}.png`), req.file.buffer);
      data.avatar = `${req.user.accountId}.png`;
    } else if (data.avatar === 'false') {
      const to = path.join(process.cwd(), 'static/avatars', `${req.user.accountId}.png`);
      if (!existsSync(to)) throw new APIError({ code: 400, message: `account with id ${req.user.accountId} has no avatar` });
      unlinkSync(to);
      data.avatar = '';
    }

    const result = await dataMapper.update(Number(req.params.id), data);
    result.password = null;

    res.status(200).json(result);
  },
};
