const { Router } = require('express');
const upload = require('multer')();

const asyncHelper = require('../helpers/async');
const validation = require('../middlewares/validate');
const schema = require('../schemas/connect');
const controller = require('../controllers/connect');

const router = Router();

/**
 * Connect info
 * @typedef { object } ConnectInfo
 * @property { string } token - access token
 * @property { number } accountId - account id
 */

/**
 * POST /v1/connect
 * @summary connect account
 * @tags Connect
 * @returns { ConnectInfo } 200 - success response - application/json
 */
router.post('/', upload.none(), validation(schema.connect, 'body'), asyncHelper(controller.connect));

module.exports = router;
