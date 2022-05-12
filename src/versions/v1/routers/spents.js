const { Router } = require('express');
const upload = require('multer')();

const asyncHelper = require('../helpers/async');
const validation = require('../middlewares/validate');
const userAccess = require('../middlewares/userAccess');
const schema = require('../schemas/spents');
const controller = require('../controllers/spents');

const router = Router();

/**
 * Getting spent
 * @typedef { object } GetSpent
 * @property { number } id - spent id
 * @property { number } amount - spent amount
 * @property { string } date - spent date
 * @property { boolean } subscription - repeat each month
 * @property { integer } accountId - spent account id
 * @property { integer | null } categoryId - spent category id
 */

/**
 * Creating spent
 * @typedef { object } CreateSpent
 * @property { number } amount.required - spent amount
 * @property { string } date - spent date
 * @property { boolean } subscription.required - repeat each month
 * @property { integer } categoryId - spent category id
 */

/**
 * DELETE /v1/spents/{id}
 * @summary Delete spent
 * @tags Spents
 * @security BearerAuth
 * @param { number } id.path - spent id
 */
router.delete('/:id(\\d+)', upload.none(), userAccess, asyncHelper(controller.delete));

/**
 * GET /v1/spents
 * @summary Get all spents
 * @tags Spents
 * @security BearerAuth
 * @returns { GetSpent[] } 200 - success response - application/json
 */
router.get('/', upload.none(), userAccess, asyncHelper(controller.getAll));

/**
 * GET /v1/spents/{id}
 * @summary Get spent
 * @tags Spents
 * @security BearerAuth
 * @param { number } id.path - spent id
 * @returns { GetSpent } 200 - success response - application/json
 */
router.get('/:id(\\d+)', upload.none(), userAccess, asyncHelper(controller.getOne));

/**
 * GET /v1/spents/{categoryId}
 * @summary Get all spents by category
 * @tags Spents
 * @security BearerAuth
 * @param { number } categoryId.path - spent category id
 * @returns { GetSpent[] } 200 - success response - application/json
 */
router.get('/category/:categoryId', upload.none(), userAccess, asyncHelper(controller.getAllByCategory));

/**
 * POST /v1/spents
 * @summary Post spent
 * @tags Spents
 * @security BearerAuth
 * @param { CreateSpent } request.body.required - spent info - application/json
 * @returns { GetSpent } 201 - success response - application/json
 */
router.post('/', upload.none(), userAccess, validation(schema.create, 'body'), asyncHelper(controller.create));

module.exports = router;
