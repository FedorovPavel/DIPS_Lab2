const express   = require('express'),
      router    = express.Router();
      mongoose  = require('mongoose');
      billings  = mongoose.model('Billing');

module.exports = function(app) {
  app.use('/billings', router);
};

router.put('/createBilling', function(req, res, next) {
  const param = {
    PaySystem : req.body.paySystem,
    Account   : req.body.account,
    Cost      : parseInt(req.body.cost)
  };
  if (typeof(param.Account)   == 'undefined'  || !param.Account   || param.Account.length   == 0  ||
      typeof(param.PaySystem) == 'undefined'  || !param.PaySystem || param.PaySystem.length == 0  ||
      typeof(param.Cost)      == 'undefined'  || isNaN(param.Cost) || param.Cost < 10){
        res.status(400).send('Bad request');
  } else {
    billings.createBillingRecord(param, function(err, billing){
      if (err)
        res.status(400).send(err);
      else {
        res.status(200).send(billing);
      }
    });
  }
});

router.get('/getBilling/:id', function(req, res, next){
  const id = req.params.id;
  if (!id || typeof(id) == 'undefined' || id.length == 0)
    res.status(400).send('Bad request');
  else {
    billings.getBillingRecord(id, function(err, billing){
      if (err)
        res.status(400).send(err);
      else {
        if (billing){
          res.status(200).send(billing);
        } else {
          res.status(404).send('Billing not found');
        }
      }
    });
  }
});