const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Country = mongoose.model('Country');
const Table = mongoose.model('Table');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', async (req, res, next) => {

  const data = await Table.find().limit(1);

  const filterData = {
    "_id": data[0]._doc.name,
    "name": data[0]._doc.name,
    "flag": data[0]._doc.flag,
    "iso2": data[0]._doc.iso2,
    "iso3": data[0]._doc.iso3,
    "isoNumeric": data[0]._doc.isoNumeric,
    "geoNameId": data[0]._doc.geoNameId,
    "phoneCode": data[0]._doc.phoneCode,
    "continent": data[0]._doc.continent,
    "capital": data[0]._doc.capital,
    "currency": data[0]._doc.currency
  }

  
  Country.find().then(data => {
    
    const showData = {
      _id: (parseInt(filterData.name) == 1) ? true : false,
      name: (parseInt(filterData.name) == 1) ? true : false,
      flag: (parseInt(filterData.flag) == 1) ? true : false,
      iso2: (parseInt(filterData.iso2) == 1) ? true : false,
      iso3: (parseInt(filterData.iso3) == 1) ? true : false,
      isoNumeric: (parseInt(filterData.isoNumeric) == 1) ? true : false,
      geoNameId: (parseInt(filterData.geoNameId) == 1) ? true : false,
      phoneCode: (parseInt(filterData.phoneCode) == 1) ? true : false,
      continent: (parseInt(filterData.continent) == 1) ? true : false,
      capital: (parseInt(filterData.capital) == 1) ? true : false,
      currency: (parseInt(filterData.currency) == 1) ? true : false
    }

    var dataFormat = [];
  
    for (let index = 0; index < data.length; index++) {
      dataFormat.push(data[index]._doc);
    }

    res.render('index', {
      title: 'Find Country',
      country: dataFormat,
      show: showData
    });

  }).catch( err => console.log(err));
  

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
