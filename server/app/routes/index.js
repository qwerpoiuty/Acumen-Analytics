'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/groups', require('./groups'));
router.use('/graphs', require('./graphs'))
router.use('/members', require('./members'))
router.use('/users', require('./users'))
// Make sure this is after all of
// the registered routes!
router.use(function(req, res) {
    res.status(404).end();
});