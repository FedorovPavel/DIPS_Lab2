process.env.NODE_ENV = 'development';

var mongoose    = require('mongoose');
var DBmodel     = require('./../../app/models/car_schema');

var chai        = require('chai'),
    chaiHttp    = require('chai-http'),
    server      = require('./../../app.js'),
    should      = chai.should();

chai.use(chaiHttp);

describe('api cars controller', function(){

    describe('Get cars 0 - 20', function(){
        it('Good request /catalog/get_cars/page/*/count/*', function(done){
            chai.request(server)
            .get('/catalog/get_cars/page/0/count/20')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(20);
                done();
            });
        });
    });

    describe('Get cars 0 - 20', function(){
        it('Bad request /catalog/get_cars/page/*/count/* without page', function(done){
            chai.request(server)
            .get('/catalog/get_cars/page/count/20')
            .end(function(err, res) {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
        });
    });

    describe('Get cars 0 - 20', function(){
        it('Bad request /catalog/get_cars/page/*/count/* without count', function(done){
            chai.request(server)
            .get('/catalog/get_cars/page/10/count/')
            .end(function(err, res) {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
        });
    });

    describe('Get cars 0 - 20', function(){
        it('Bad request /catalog/get_cars/page/*/count/* with bad parametr page', function(done){
            chai.request(server)
            .get('/catalog/get_cars/page/bad_parametr/count/20')
            .end(function(err, res) {
                res.should.have.status(400);
                res.type.should.to.be.a('string');
                res.text.should.eql('Bad request');
                done();
            });
        });
    });

    describe('Get cars 0 - 20', function(){
        it('Bad request /catalog/get_cars/page/*/count/* with bad parametr count', function(done){
            chai.request(server)
            .get('/catalog/get_cars/page/0/count/bad_parametr')
            .end(function(err, res) {
                res.should.have.status(400);
                res.type.should.to.be.a('string');
                res.text.should.eql('Bad request');
                done();
            });
        });
    });

    describe('Get cars 0 - 20', function(){
        it('Bad request /catalog/get_cars/page/*/count/* with bad parametr count', function(done){
            chai.request(server)
            .get('/catalog/get_cars/page/0/count/bad_parametr')
            .end(function(err, res) {
                res.should.have.status(400);
                res.type.should.to.be.a('string');
                res.text.should.eql('Bad request');
                done();
            });
        });
    });

    describe('Get cars 0 - 20', function(){
        it('Bad request /catalog/get_cars/page/*/count/* with negative count', function(done){
            chai.request(server)
            .get('/catalog/get_cars/page/0/count/-20')
            .end(function(err, res) {
                res.should.have.status(400);
                res.type.should.to.be.a('string');
                res.text.should.eql('Bad request');
                done();
            });
        });
    });

    describe('Get cars 0 - 20', function(){
        it('Bad request /catalog/get_cars/page/*/count/* with negative page', function(done){
            chai.request(server)
            .get('/catalog/get_cars/page/-20/count/20')
            .end(function(err, res) {
                res.should.have.status(400);
                res.type.should.to.be.a('string');
                res.text.should.eql('Bad request');
                done();
            });
        });
    });

    describe('Get car with id', function(){
        it('Good request /catalog/get_car/:id', function(done){
            chai.request(server)
            .get('/catalog/get_car/59f634f54929021fa8251633')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
        });
    });

    describe('Get car with id', function(){
        it('Bad request /catalog/get_car/:id without id', function(done){
            chai.request(server)
            .get('/catalog/get_car/')
            .end(function(err, res) {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
        });
    });

    describe('Get car with id', function(){
        it('Bad request /catalog/get_car/:id with undefined id', function(done){
            chai.request(server)
            .get('/catalog/get_car/undefined')
            .end(function(err, res) {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.status.should.eql('Error');
                done();
            });
        });
    });
});