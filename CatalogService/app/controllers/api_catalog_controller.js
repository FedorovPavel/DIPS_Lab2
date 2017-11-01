var express   = require('express'),
    router    = express.Router(),
    mongoose  = require('mongoose'),
    catalog   = mongoose.model('Car');

module.exports = function (app) {
  app.use('/catalog', router);
};


//  get cars
router.get('/get_cars/page/:page/count/:count', function(req, res, next){
  const page  = parseInt(req.params.page);
  const count = parseInt(req.params.count);
  if (page < 0 || isNaN(page) || count < 0 || isNaN(count)){
    res.status(400).send('Bad request');
  } else {
    catalog.getCars(Number(page), Number(count), function(err ,result){
      if (err)
        return next(err);
      else {
        res.status(200).send(result);
      }
    });
  }
});

router.get('/get_car/:id', function(req, res, next){
  const id = req.params.id;
  if (!id || id.length == 0 || typeof(id) == 'undefined') {
    res.status(400).send('Bad request');
  } else {
    catalog.getCar(id, function(err, result){
      if (err) {
        if (err.kind == "ObjectID")
          res.status(400).send({status:'Error', message : 'Invalid ID'});
        else 
          res.status(400).send({status:'Error', message : 'Not found'});
      } else {
        res.status(200).send(result);
      }
    });
  }
});

/*
router.get('/generate_random_cars', function (req, res, next) {
  const count = req.query.count ? req.query.count : 100;
    for (let I = 0; I < count; I++){
      let car = new catalog({
        Manufacturer  : 'Generate random car ' + I.toString(),
        Model         : 'Model ' + I.toString(),
        Type          : "Type" + (I%5).toString(),
        Doors         : (I % 9)+1,
        Person        : 1+I,
        Loactaion     : {
          City    : 'Moscow',
          Street  : I.toString() +'Советский переулок',
          House   : (100 - I)
        },
        Cost          : (I + 0.1)
      });
      catalog.saveNewCar(car, function(err, result){
        if (err)
          return next(err);
        else 
          console.log("Save new car " + I);
      });
    }
  res.status(200).send('Random ' + count + 'car');
});*/