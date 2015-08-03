var express = require('express');
var router = express.Router();
var Movie = require("../../models/movie/Movies");


router.get("/admin/movieList",function(req, res, next) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err)
        }
        res.render('admin/add-movies', {
            title: 'moviesite 列表页',
            movies: movies
        })
    });
});

router.get("/movie/:id",function(req ,res ,next){
   var _id = req.params.id;
    Movie.findById(_id,function(err, movie){
        console.log("movie==================="+movie)
        res.render('pages/detail', {
            title: 'moviesite 详情页',
            movie: movie
        })

    })
});


router.post("/admin/movie/add",function(req , res ){
    console.log("/api/movie/add=================="+req.body.title)
    var movie = new Movie({
        title:req.body.title,
        director:req.body.director,
        country:req.body.country,
        language:req.body.language,
        year:req.body.year,
        flash:req.body.flash,
        poster:req.body.poster,
        summary:req.body.summary
    });

    movie.save(function(err){
        if(err){
            console.log(err)
        }
        else res.end()
    })

});




module.exports = router;