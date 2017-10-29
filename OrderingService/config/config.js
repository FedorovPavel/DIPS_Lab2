const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'orderingservice'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/orderingservice-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'orderingservice'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/orderingservice-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'orderingservice'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/orderingservice-production'
  }
};

module.exports = config[env];
