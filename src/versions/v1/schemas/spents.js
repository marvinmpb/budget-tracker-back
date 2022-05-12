const joi = require('joi');

module.exports = {
  create: joi.object({
    amount: joi.number().integer().positive().required(),
    comment: joi.string().required(),
    date: joi.date().timestamp('javascript'),
    subscription: joi.boolean(),
    categoryId: joi.number().integer().positive(),
  }).min(2).max(5).required(),
};
