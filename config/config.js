const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'country-find'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/country-find-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'country-find'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/country-find-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'country-find'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/country-find-production'
  }
};

module.exports = config[env];
