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
                .get('/catalog/get_cars/page/0/count/20')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(20);
                    done();
                });
            });
        });
    });
});