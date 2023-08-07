const router = require('express').Router();
const users = require('./user-routes');
const thoughts = require('./thought-routes');

router.use('/users', users);
router.use('/thoughts', thoughts);

module.exports = router;