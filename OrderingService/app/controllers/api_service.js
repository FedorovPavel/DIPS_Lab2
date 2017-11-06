const express   = require('express'),
      router    = express.Router(),
      mongoose  = require('mongoose'),
      orders    = mongoose.model('Order'),
      validator = require('./../validator/validator'),
      coordinator = require('./../coordinator/bus');

module.exports = function(app) {
  app.use('/orders', router);
};

router.get('/getOrders/:id/page/:page/count/:count', function(req, res, next){
  const id    = req.params.id; 
  const page  = parseInt(req.params.page);
  const count = parseInt(req.params.count);
  if (!id || typeof(id) == 'undefined' || id.length == 0 ||
      typeof(page) == 'undefined' || isNaN(page)||  page < 0 ||
      typeof(count) == 'undefined' || isNaN(count)|| count <= 0){
    res.status(400).send('Bad request');
  } else {
    orders.getOrders(id, page, count, function(err, orders){
      if (err) {
        if (err.kind == 'ObjectId')
          res.status(400).send('Bad ID');
        else if (err == 'user ID is undefined')
          res.status(400).send('Bad request');
        else 
          return next(err);
      }
      else {
        if (orders) {
          let result = [];
          let loop = 0;
          for (let I = 0; I < orders.length; I++){
            result[I] = orders[I];
            coordinator.getCar(orders[I].CarID, function(err ,code , response){
              delete result[I].CarID;
              if (code == 200){
                result[I].Car = response;
              } else {
                result[I].Car = undefined;
              }
              loop++;
              if (loop == orders.length){
                res.status(200).send(result);
              }
            });
          }
        } else {
          res.status(404).send('Not found orders');
        }
      }
    });
  }
});

router.get('/getOrder/:id', function(req, res, next) {
  const id = req.params.id;
  if (!id || typeof(id) == 'undefined' || id.length == 0) {
    res.status(400).send('Bad request');
  } else {
    orders.getOrder(id, function(err, order){
      if (err) {
        if (err.kind == 'ObjectId')
          res.status(400).send('Bad ID');
        else 
          return next(err);
      } else {
        if (order){
          coordinator.getCar(order.CarID, function(err ,code , response){
            delete order.CarID;
            if (code == 200){
              order.Car = response;
            } else {
              order.Car = undefined;
            }
            res.status(200).send(order);
          });
        } else {
          res.status(404).send("Order isn't found");
        }
      }
    })
  } 
});

router.post('/:id/confirm_order', function(req, res, next){
  const id = req.params.id;
  if (!id || id.length == 0 || typeof(id) == 'undefined'){
    res.status(400).send('Bad request');
  } else {
    orders.setWaitStatus(id, function(err, result){
      if (err)
      {
        if (err.kind == "ObjectId")
          res.status(400).send('Bad ID');
        else if (err == "Status don't right")
          res.status(400).send(err)
        else 
          return next (err);
      }
      else {
        if (result) {
          res.status(200).send('Change status succesfully');
        } else {
          res.status(404).send('Not found order');
        }
      }
    });
  }
});

router.post('/:id/order_paid', function(req, res, next){
  const id = req.params.id;
  if (!id || id.length == 0 || typeof(id) == 'undefined'){
    res.status(400).send('Bad request');
  } else {
    orders.setPaidStatus(id, function(err, result){
      if (err){
        if (err.kind == "ObjectId")
          res.status(400).send('Bad ID');
        else if (err == "Status don't right")
          res.status(400).send(err)
        else 
          return next (err);
      } else {
        if (result) {
          res.status(200).send('Change status succesfully');
        } else {
          res.status(404).send('Not found order');
        }
      }
    });
  }
});

router.post('/:id/completed_order', function(req, res, next){
  const id = req.params.id;
  if (!id || id.length == 0 || typeof(id) == 'undefined'){
    res.status(400).send('Bad request');
  } else {
    orders.setCompletedStatus(id, function(err, result){
      if (err) {
        if (err.kind == "ObjectId")
          res.status(400).send('Bad ID');
        else if (err == "Status don't right")
          res.status(400).send(err)
        else 
          return next (err);
      } else {
        if (result) {
          res.status(200).send('Change status succesfully');
        } else {
          res.status(404).send('Not found order');
        }
      }
    });
  }
});

router.put('/createOrder', function(req, res, next){
  let item = {
    UserID    : req.body.userID,
    CarID     : req.body.carID,
    StartDate : validator.ConvertStringToDate(req.body.startDate),
    EndDate   : validator.ConvertStringToDate(req.body.endDate)
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