const router = require('express').Router();
const loginRoutes = require('./loginroute');

router.use('/users', loginRoutes);

module.exports = router;
