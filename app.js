var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cors = require('cors');

var swapRouter = require('./routes');

var app = express();


app.use(cors());

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/swap', swapRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send('error');
});

module.exports = app;
