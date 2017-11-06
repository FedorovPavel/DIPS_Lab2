process.env.NODE_ENV = 'development';

var chai        = require('chai'),
    chaiHttp    = require('chai-http'),
    server      = require('./../../app.js'),
    should      = chai.should();

chai.use(chaiHttp);

describe('Order-api controller', function(){

    describe('Create order PUT /orders/createOrder', function(){
        describe('Good request', function(){
            var data = {
                userID      : "59f634f54929021fa8251644",
                carID       : "59f634f54929021fa8251648",
                startDate   : "1.11.2017",
                endDate     : "6.11.2017"
            };
            it('Good request', function(done){
                chai.request(server)
                .put('/orders/createOrder')
                .send(data)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.UserID.should.eql(data.userID);
                    res.body.CarID.should.eql(data.carID);
                    res.body.Lease.StartDate.should.eql(new Date(2017,10,1).toISOString());
                    res.body.Lease.EndDate.should.eql(new Date(2017,10,6).toISOString());
                    done();
                });
            });
        });
        describe('Bad request', function(){
            const data = {
                carID       : "59f634f54929021fa8251648",
                startDate   : "1.11.2017",
                endDate     : "6.11.2017"
            };
            it('userID is undefined', function(done){
                chai.request(server)
                .put('/orders/createOrder')
                .send(data)
                .end(function(err, res) {
                    res.should.have.status(400);
                    res.type.should.be.a('string');
                    res.text.should.eql('Bad request');
                    done();
                });
            });
        });
        describe('Bad request', function(){
            const data = {
                userID      : "59f634f54929021fa8251644",
                startDate   : "1.11.2017",
                endDate     : "6.11.2017"
            };
            it('carID is undefined', function(done){
                chai.request(server)
                .put('/orders/createOrder')
                .send(data)
                .end(function(err, res) {
                    res.should.have.status(400);
                    res.type.should.be.a('string');
                    res.text.should.eql('Bad request');
                    done();
                });
            });
        });
        describe('Bad request', function(){
            const data = {
                userID      : "59f634f54929021fa8251644",
                carID       : "59f634f54929021fa8251648",
                endDate     : "6.11.2017"
            };
            it('StartDate is undefined', function(done){   
                chai.request(server)
                .put('/orders/createOrder')
                .send(data)
                .end(function(err, res) {
                    res.should.have.status(400);
                    res.type.should.be.a('string');
                    res.text.should.eql('Bad request');
                    done();
                });
            });
        });
        describe('Bad request', function(){
            const data = {
                userID      : "59f634f54929021fa8251644",
                carID       : "59f634f54929021fa8251648",
                startDate   : "6.11.2017"
            };
            it('EndDate is undefined', function(done){
                chai.request(server)
                .put('/orders/createOrder')
                .send(data)
                .end(function(err, res) {
                    res.should.have.status(400);
                    res.type.should.be.a('string');
                    res.text.should.eql('Bad request');
                    done();
                });
            });
        });
        describe('Bad request', function(){
            const data = {
                userID      : "59f634f54929021fa8251644",
                carID       : "59f634f54929021fa8251648",
                startDate   : "1.11.2017",
                endDate     : "6.11.2017",
                author      : 'Mocha'
            };
            it('Unknown fields', function(done){
                chai.request(server)
                .put('/orders/createOrder')
                .send(data)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.UserID.should.eql(data.userID);
                    res.body.CarID.should.eql(data.carID);
                    res.body.Lease.StartDate.should.eql(new Date(2017,10,1).toISOString());
                    res.body.Lease.EndDate.should.eql(new Date(2017,10,6).toISOString());
                    done();
                });
            });
        });
    });
});