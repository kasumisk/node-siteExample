var express = require('express');
var router = express.Router();
var Movie = require("../models/movie/Movies");

/* GET home page. */
router.get('/', function(req, res, next) {
    //console.log("session.user======="+req.session.user)
    //console.log("session.user======="+req.session.user.password)
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err)
        }
        res.render('index', {
            title: 'moviesite 首页',
            movies: movies
        })
    })

});

router.post('/test/api',function(res,req){
   var appid = req.query.appid;
    console.log(req.query);
    console.log("get /test/api is appid ======" + appid);
    res.end(appid);

});

module.exports = router;
