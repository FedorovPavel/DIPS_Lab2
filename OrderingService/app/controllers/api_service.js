const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      orders = mongoose.model('Order');

module.exports = function(app) {
  app.use('/', router);
};

router.get('/', function(req, res, next) {
  Article.find(function(err, articles) {
    if (err) return next(err);
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});
