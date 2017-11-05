const express   = require('express'),
      router    = express.Router(),
      mongoose  = require('mongoose'),
      orders    = mongoose.model('Order'),
      validator = require('./../validator/validator');

module.exports = function(app) {
  app.use('/orders', router);
};

router.get('/getOrder/:id', function(req, res, next) {
  const id = req.params.id;
  if (!id || typeof(id) == 'undefined' || id.length == 0) {
    res.status(400).send('Bad request');
  } else {
    orders.getOrder(id, function(err, order){
      if (err)
        return next(err);
      else {
        if (order){
          res.status(200).send(order);
        } else {
          res.status(404).send("Order isn't found");
        }
      }
    })
  } 
});

router.put('/createOrder', function(req, res, next){
  let item = {
    UserID    : req.body.userID,
    CarID     : req.body.carID,
    StartDate : validator.ConvertStringToDate(req.body.startDate).toString(),
    EndDate   : validator.ConvertStringToDate(req.body.endDate).toString()
  };
  if (!item.UserID  || typeof(item.UserID) == 'undefined' || item.UserID.length == 0 ||
      !item.CarID   || typeof(item.CarID) == 'undefined'  || item.CarID.length == 0 ||
      !item.StartDate || typeof(item.StartDate) == 'undefined' || item.StartDate.length == 0 ||
      !item.EndDate || typeof(item.EndDate) == 'undefined' || item.EndDate.length == 0) {
      res.status(400).send('Bad request');
  } else {
    orders.createOrder(item, function(err, result){
      if (err)
        return next(err);
      else {
        if (result) {
          res.status(200).send(result);
        } else {
          res.status(500).send('Oooops');
        }
      }
    });
  }
});