process.env.NODE_ENV = 'development';

var mongoose    = require('mongoose');

var chai        = require('chai'),
    chaiHttp    = require('chai-http'),
    server      = require('./../../app.js'),
    should      = chai.should();

chai.use(chaiHttp);

describe('Get orders GET /orders/:id/page/:page/count/:count', function(){
    describe('Good request', function(){
        it ('Good requset', function(done){
            chai.request(server)
            .get('/orders/getOrders/59f634f54929021fa8251644/page/0/count/5')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(5);
                done();
            });
        });
    });
});