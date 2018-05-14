const express = require('express');
const router = express.Router();

const request = require('request-promise');

const {middleware} = require('apicache');

const apiKey = process.env.apiKey;


const uri_base = 'https://changenow.io/api';

const version = 'v1';

const uri = `${uri_base}/${version}/`;

const options = {
    uri,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true
};


/* GET swap listing. */
router.get('/', function (req, res, next) {
    res.json('respond with a resource');
});


router.get('/currencies', middleware('1 hour'), function (req, res, next) {


    const options_ = Object.assign({}, options, {uri: `${uri}currencies`});

    request(options_)
        .then(result => res.status(200).json(result))
        .catch(err => {
            res.status(500).json(err);
        })
});


router.get('/exchange-amount/:amount/:from/:to', (req, res) => {

    const {amount, from, to} = req.params;


    const options_ = Object.assign({}, options, {uri: `${uri}exchange-amount/${amount}/${from}_${to}`});

    request(options_)
        .then(result => res.status(200).json(result))
        .catch(err => {
            res.status(500).json(err);
        })
});

router.get('/min-amount/:from/:to', (req, res) => {

    const {from, to} = req.params;

    const options_ = Object.assign({}, options, {uri: `${uri}min-amount/${from}_${to}`});


    request(options_)
        .then(result => res.status(200).json(result))
        .catch(err => {
            res.status(500).json(err);
        })
})


router.post('/transactions', (req, res) => {


    let {body: {from, to, amount, address}} = req;

    amount = parseFloat(amount);


    if (!(from && to && amount && address)) {


        return res.status(400).json('invalid request');
    }


    const options_ = Object.assign({}, options, {
        method: 'post',
        uri: `${uri}transactions/${apiKey}`,
        body: {from, to, amount, address}
    });


    request(options_)
        .then(result => res.status(200).json(result))
        .catch(err => {
            res.status(500).json(err);
        })
});


router.get('/transactions/:id', (req, res) => {

    const {id} = req.params;

    const options_ = Object.assign({}, options, {uri: `${uri}transactions/${id}/${apiKey}`});

    request(options_)
        .then(result => res.status(200).json(result))
        .catch(err => {
            res.status(500).json(err);
        })

});

router.get('/transactions', (req, res) => {

    const options_ = Object.assign({}, options, {uri: `${uri}transactions/${apiKey}`});

    request(options_)
        .then(result => res.status(200).json(result))
        .catch(err => {
            res.status(500).json(err);
        })

});


module.exports = router;
