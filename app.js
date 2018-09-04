
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

const swapRouter = require('./routes');

const app = express();

app.use(helmet());
app.use(compression());
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
