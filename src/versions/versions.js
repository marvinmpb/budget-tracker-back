const { Router } = require('express');

const versions = Router();

versions.use('/v1', require('./v1'));

module.exports = versions;
