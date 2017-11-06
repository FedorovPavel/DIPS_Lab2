process.env.NODE_ENV = 'development';

var mongoose    = require('mongoose');

var chai        = require('chai'),
    chaiHttp    = require('chai-http'),
    server      = require('./../../app.js'),
    should      = chai.should();

chai.use(chaiHttp);

describe('test', function(){
    it('test', function(done){
        done();
    });
});