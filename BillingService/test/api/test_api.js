process.env.NODE_ENV = 'development';

var chai        = require('chai'),
    chaiHttp    = require('chai-http'),
    server      = require('./../../app.js'),
    should      = chai.should();

chai.use(chaiHttp);

describe('Create billing record PUT /billings/createBilling', function(){
    const correctDate = {
        paySystem   : "Сбербанк",
        account     : "0000 4444 4444 0000 00",
        cost        : "200"
    }
    it('Good request ', function(done){
        chai.request(server)
        .put('/billings/createBilling')
        .send(correctDate)
        .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.PaySystem.should.eql(correctDate.paySystem);
            res.body.Account.should.eql(correctDate.account);
            res.body.Cost.should.eql(parseInt(correctDate.cost));
            done();
        });
    });
    it('Bad request - PaySystem is undefined',function(done){
        let incorrectData = correctDate;
        delete incorrectData.paySystem;
        chai.request(server)
        .put('/billings/createBilling')
        .send(correctDate)
        .end(function(err, res) {
            res.should.have.status(400);
            res.type.should.be.a('string');
            res.text.should.eql('Bad request');
            done();
        });
    });
    it('Bad request - account is undefined',function(done){
        let incorrectData = correctDate;
        delete incorrectData.account;
        chai.request(server)
        .put('/billings/createBilling')
        .send(correctDate)
        .end(function(err, res) {
            res.should.have.status(400);
            res.type.should.be.a('string');
            res.text.should.eql('Bad request');
            done();
        });
    });
    it('Bad request - Cost is undefined',function(done){
        let incorrectData = correctDate;
        delete incorrectData.cost;
        chai.request(server)
        .put('/billings/createBilling')
        .send(correctDate)
        .end(function(err, res) {
            res.should.have.status(400);
            res.type.should.be.a('string');
            res.text.should.eql('Bad request');
            done();
        });
    });
});