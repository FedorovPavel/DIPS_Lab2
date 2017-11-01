process.env.NODE_ENV = 'test';

var chai        = require('chai'),
    chaiHttp    = require('chai-http'),
    server      = require('./../../app.js'),
    should      = chai.should();

chai.use(chaiHttp);

