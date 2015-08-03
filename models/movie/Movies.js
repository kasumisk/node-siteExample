var mongoose = require('mongoose');

var MovieSchema=require('../../schema/Movie/MovieSchema');
var Movies=mongoose.model('Movies',MovieSchema);

module.exports = Movies;