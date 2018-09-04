'use strict';

require('dotenv').load();

var chai = require('chai').use(require('chai-as-promised'));
var expect = chai.expect;
var request = require('supertest');

var app = require('../app');

const should = chai.should;


describe('test()', function () {
    it('get currencies', function (done) {

        request(app)
            .get('/swap/currencies')
            .expect('Content-Type', /json/)
            .expect(200, done)

    });

    it('should list transactions', function (done) {

        request(app)
            .get('/swap/transactions')
            .expect(200, done);
    });


    it('should get tx by id', function (done) {

        const id = 'b3c25544d5a034';
        request(app)
            .get('/swap/transactions/' + id)
            .expect(200, done);
    });

    it('should get min exchange amount', function (done) {

        request(app)
            .get('/swap/min-amount/etc/btc')
            .expect(200, done);
    });

    it('should return 404', function (done) {
        request(app)
            .get('/does/not/exist')
            .query({})
            .expect(404, done);
    });
});
