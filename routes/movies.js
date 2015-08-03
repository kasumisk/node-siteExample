var express = require('express');
var router = express.Router();
var Movie = require("../models/movie/Movies")

router.get("/movies",function(req, res, next) {
    res.render('movies', { title: 'Express' });
});


module.exports = router;