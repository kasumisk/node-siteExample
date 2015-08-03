var express = require('express');
var router = express.Router();

router.get("/comment",function(req, res, next) {
    res.render('comment', { title: 'comment' });
});

module.exports = router;