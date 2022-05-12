const joi = require('joi');

// avatar à mettre une fois que les images seront gérées

module.exports = {
  create: joi.object({
    firstname: joi.string().min(2).required(),
    lastname: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(/\S/).required(),
    moneyDevise: joi.string().pattern(/(euro|dollar)/).required(),
  }).min(5).max(6).required(),

  update: joi.object({
    firstname: joi.string().min(2),
    lastname: joi.string().min(2),
    email: joi.string().email(),
    password: joi.string().pattern(/\S/),
    avatar: joi.any(),
    moneyDevise: joi.string().pattern(/(euro|dollar)/),
  }).min(0).max(6).required(),
};
