const { Router } = require('express');
const upload = require('multer')();

const asyncHelper = require('../helpers/async');
const validation = require('../middlewares/validate');
const userAccess = require('../middlewares/userAccess');
const schema = require('../schemas/categories');
const controller = require('../controllers/categories');

const router = Router();

/**
 * Getting category
 * @typedef { object } GetCategory
 * @property { number } id - category id
 * @property { string } name - category name
 * @property { string | null } color - category hex color
 * @property { string } icon - category icon
 * @property { number | null } accountId - category user id
 */

/**
 * Creating category
 * @typedef { object } CreateCategory
 * @property { string } name.required - category name
 * @property { string | null } color - category color
 * @property { string } icon.required - category icon
 */

/**
 * Updating category
 * @typedef { object } UpdateCategory
 * @property { string } name - category name
 * @property { string } color - category color
 * @property { string } icon - category icon
 */

/**
 * DELETE /v1/categories/{id}
 * @summary Delete category
 * @tags Categories
 * @security BearerAuth
 * @param { number } id.path - category id
 */
router.delete('/:id(\\d+)', upload.none(), userAccess, asyncHelper(controller.delete));

/**
 * GET /v1/categories
 * @summary Get all categories
 * @tags Categories
 * @security BearerAuth
 * @returns { GetCategory[] } 200 - success response - application/json
 */
router.get('/', upload.none(), userAccess, asyncHelper(controller.getAll));

/**
 * GET /v1/categories/{id}
 * @summary Get category
 * @tags Categories
 * @security BearerAuth
 * @param { number } id.path - category id
 * @returns { GetCategory } 200 - success response - application/json
 */
router.get('/:id(\\d+)', upload.none(), userAccess, asyncHelper(controller.getOne));

/**
 * PATCH /v1/categories/{id}
 * @summary Get category
 * @tags Categories
 * @security BearerAuth
 * @param { number } id.path - category id
 * @param { UpdateCategory } request.body.required - category info - application/json
 * @returns { GetCategory } 200 - success response - application/json
 */
router.patch('/:id(\\d+)', upload.none(), userAccess, validation(schema.update, 'body'), asyncHelper(controller.update));

/**
 * POST /v1/categories
 * @summary Get category
 * @tags Categories
 * @security BearerAuth
 * @param { CreateCategory } request.body.required - category info - application/json
 * @returns { GetCategory } 201 - success response - application/json
 */
router.post('/', upload.none(), userAccess, validation(schema.create, 'body'), asyncHelper(controller.create));

module.exports = router;
