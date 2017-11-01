var express = require('express'),
    router  = express.Router(),
    bus     = require('./../request_send_function/bus');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.render('index', {
      title: 'Generator-Express MVC'
  });
});

// Get any cars
router.get('/catalog/cars/:page/:count', function(req, res, next){
  const page  = parseInt(req.params.page);
  const count = parseInt(req.params.count);
  if(page < 0 || isNaN(page) || count < 0 || isNaN(count)){
    res.status(400).send('Bad request');
  } else {
    bus.getCars(page, count, function(err, statusCode, responseText){
      if (err)
        return next(err);
      else {
        res.status(statusCode).send(responseText);
      }
    });
  }
});

//  Get car by ID
router.get('/catalog/car/:id', function(req, res, next){
  const id = req.params.id;
  if (id.length == 0 || typeof(id) == 'undefined' || !id){
    res.status(400).send('Bad request');
  } else {
    bus.getCar(id, function(err, statusCode, responseText){
      if (err)
        return next(err);
      else 
        res.status(statusCode).send(responseText);
    });
  }
});