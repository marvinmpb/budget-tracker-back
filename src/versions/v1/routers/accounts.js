const { Router } = require('express');
const upload = require('multer')();

const asyncHelper = require('../helpers/async');
const validation = require('../middlewares/validate');
const userAccess = require('../middlewares/userAccess');
const schema = require('../schemas/accounts');
const controller = require('../controllers/accounts');

const router = Router();

/**
 * Getting account
 * @typedef { object } GetAccount
 * @property { number } id - account id
 * @property { string } firstname - user firstname
 * @property { string } lastname - user lastname
 * @property { string } email - user email
 * @property { string } avatar - user avatar
 * @property { string } moneyDevise - account default money devise
 */

/**
 * Creating account
 * @typedef { object } CreateAccount
 * @property { string } firstname.required - user firstname
 * @property { string } lastname.required - user lastname
 * @property { string } email.required - user email
 * @property { string } password.required - user password
 */

/**
 * Updating account
 * @typedef { object } UpdateAccount
 * @property { string } firstname - user firstname
 * @property { string } lastname - user lastname
 * @property { string } email - user email
 * @property { string } password - user password
 * @property { unknown | false } avatar - user avatar
 * @property { string } moneyDevise - account default money devise
 */

/**
 * DELETE /v1/accounts/{id}
 * @summary Delete account
 * @tags Accounts
 * @security BearerAuth
 * @param { number } id.path - account id
 */
router.delete('/:id(\\d+)', upload.none(), userAccess, asyncHelper(controller.delete));

/**
 * GET /v1/accounts
 * @summary Get account
 * @tags Accounts
 * @security BearerAuth
 * @returns { GetAccount } 200 - success response
 */
router.get('/', upload.none(), userAccess, asyncHelper(controller.getOneByToken));

/**
 * GET /v1/accounts/{id}
 * @summary Get account
 * @tags Accounts
 * @security BearerAuth
 * @param { number } id.path - account id
 * @returns { GetAccount } 200 - success response
 */
router.get('/:id(\\d+)', upload.none(), userAccess, asyncHelper(controller.getOne));

/**
 * PATCH /v1/accounts/{id}
 * @summary Update account
 * @tags Accounts
 * @security BearerAuth
 * @param { number } id.path - account id
 * @param { UpdateAccount } request.body.required - account info - application/json
 * @returns { GetAccount } 200 - success response
 */
router.patch('/:id(\\d+)', userAccess, validation(schema.update, 'body'), upload.single('avatar'), asyncHelper(controller.update));

/**
 * POST /v1/accounts
 * @summary Create account
 * @tags Accounts
 * @param { CreateAccount } request.body.required - account info - application/json
 * @returns { GetAccount } 201 - success response
 */
router.post('/', upload.none(), validation(schema.create, 'body'), asyncHelper(controller.create));

module.exports = router;
