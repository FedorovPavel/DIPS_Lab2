const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      orders = mongoose.model('Order');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  Article.find((err, articles) => {
    if (err) return next(err);
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});
