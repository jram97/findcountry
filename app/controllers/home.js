const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Country = mongoose.model('Country');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', async (req, res, next) => {
  const countryList = await Country.find();

  var dataFormat = [];

  for (let index = 0; index < countryList.length; index++) {
      dataFormat.push(countryList[index]._doc);
  }

  res.render('index', {
    title: 'Find Country',
    country: dataFormat || []
  });
});

router.get('/details', async (req, res, next) => {
  Country.findOne({ iso2: req.query.country })
    .then(data => {
      res.render('details', {
        title: data._doc.name || "Not found",
        country: data._doc || []
      });
    }).catch(err => {
      console.log(err)
    })
});
