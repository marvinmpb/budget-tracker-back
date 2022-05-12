const { Router } = require('express');

const router = Router();

require('./helpers/doc')(router);

router.use('/accounts', require('./routers/accounts'));
router.use('/categories', require('./routers/categories'));
router.use('/connect', require('./routers/connect'));
router.use('/spents', require('./routers/spents'));

// error handler
router.use(require('./middlewares/error'));

// 404
router.use((req, res) => res.status(404).json({ code: 404, message: 'page not found' }));

module.exports = router;
