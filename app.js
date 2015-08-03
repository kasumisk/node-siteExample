var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
//var mongoStore = require('connect-mongo')(express);
var dbUrl = "mongodb://127.0.0.1:27017/test";

var routes = require('./routes/index');
var login = require('./routes/user/login');
var register = require('./routes/user/register');
var moviedetail = require('./routes/movie-detail');
var movies = require('./routes/movies');
var comment = require('./routes/comment');
var adminMovielist = require('./routes/admin/movieList');
var upload = require('./routes/upload');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session
app.use(session({
    secret:'technode',
    resave:true,
/*    store:new mongoStore({
        url:dbUrl,
        collection:"sessions"
    }),*/
    saveUninitialized:false,
    cookie:{
        maxAge:60*1000
    }
}))
//connect mongo
mongoose.connect(dbUrl);

app.use('/', routes);
app.use('/', moviedetail);
app.use('/', movies);
app.use('/', register);
app.use('/', login);
app.use('/', comment);
app.use('/', adminMovielist);
app.use('/', upload);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
