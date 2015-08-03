var express = require('express');
var router = express.Router();

router.get("/movie-detail/:id",function(req, res, next) {
    res.render('movies', { title: 'Express' });
});

module.exports = router;