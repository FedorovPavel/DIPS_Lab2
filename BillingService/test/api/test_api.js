process.env.NODE_ENV = 'development';

var mongoose    = require('mongoose');
var DBmodel     = require('./../../app/models/car_schema');

var chai        = require('chai'),
    chaiHttp    = require('chai-http'),
    server      = require('./../../app.js'),
    should      = chai.should();

chai.use(chaiHttp);