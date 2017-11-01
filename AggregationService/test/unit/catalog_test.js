process.env.NODE_ENV = 'test';

var chai        = require('chai'),
    chaiHttp    = require('chai-http'),
    server      = require('./../../app.js'),
    should      = chai.should();

chai.use(chaiHttp);

describe('Unit test with CatalogService', function(){
    describe('Get cars', function(){
        describe('Good request', function(){
            it('Good request /catalog/cars/*/*', function(done){
                chai.request(server)
                .get('/catalog/cars/0/20')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(20);
                    done();
                });
            });
        });
        describe('Bad request, without page parametr', function(done){
            it('Bad request /catalog/cars//* without page', function(done){
                chai.request(server)
                .get('/catalog/cars//20')
                .end(function(err, res) {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
            });
        });
    });

    describe('Get car by ID', function(){
        describe('Good request', function(){
            it('Good request /catalog/car/*', function(done){
                chai.request(server)
                .get('/catalog/car/59f634f54929021fa8251633')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
            });
        });
    });
});