const joi = require('joi');

module.exports = {
  connect: joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }).length(2).required(),
};
