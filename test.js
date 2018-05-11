'use strict';

var chai = require('chai').use(require('chai-as-promised'));
var expect = chai.expect;
var request = require('supertest');

var app = require('./app');

const should = chai.should;


describe('Test API', function () {
    describe('test()', function () {
        it('should test', function (done) {
            request(app)
                .get('/swap')
                .query({})
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    expect(err).to.equal(null);
                    expect(res.body).to.equal('respond with a resource');
                    done();
                });
        });

        it('should get coins', function () {

            request(app)
                .get('/swap/currencies')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {

                    expect(err).to.equal(null);


                })
        })

        it('should return 404', function (done) {
            request(app)
                .get('/does/not/exist')
                .query({})
                .expect(404, done);
        });
    });
});
