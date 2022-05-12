const jwt = require('jsonwebtoken');
const dataMapper = require('../dataMappers/connect');

module.exports = {
  /**
   * @param { import('express').Request } req
   * @param { import('express').Response } res
   */
  connect: async (req, res) => {
    const { email, password } = req.body;
    const result = await dataMapper.get(email, password);

    const token = jwt.sign({ id: result.id, date: Date.now() }, process.env.JWT_SECRET, { expiresIn: '2 hours' });
    return res.status(201).json({ accessToken: token, accountId: result.id });
  },
};
