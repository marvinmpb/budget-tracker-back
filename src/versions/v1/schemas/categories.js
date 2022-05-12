const joi = require('joi');

module.exports = {
  create: joi.object({
    name: joi.string().required(),
    color: joi.string().length(7).pattern(/#[0-9A-Fa-f]{6}/),
    icon: joi.string().required(),
  }).min(2).max(3).required(),

  update: joi.object({
    name: joi.string(),
    color: joi.string().length(7).pattern(/#[0-9A-Fa-f]{6}/),
    icon: joi.string(),
  }).min(1).max(3).required(),
};
