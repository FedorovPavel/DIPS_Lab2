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

    // describe('Create new car with full needed information with post request', function(){
    //     it('Post /car - create car', function(done){
    //         let car = {
    //             man : 'Nissan',
    //             mod : 'X-Trail',
    //             col : 'black'
    //         }
    //         chai.request(server)
    //             .post('/car')
    //             .send(car)
    //             .end(function(err, res){
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.manufacturer.should.be.eql('Nissan');
    //                 res.body.model.should.be.eql('X-Trail');
    //                 done();
    //             });
    //     });
    // });
});