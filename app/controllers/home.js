const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Country = mongoose.model('Country');
const Table = mongoose.model('Table');
const Config = mongoose.model('Config');
const Contact = mongoose.model('Contact');


module.exports = (app) => {
  app.use('/', router);
};

router.get('/', async (req, res, next) => {

  
  const config = await Config.findOne({ config: "init" });
  if (config == null) {
    const configInit = {
      fb: "https://www.facebook.com/Ulkekoducom",
      ins: "http://instagram.com/ulkekodu",
      tw: "https://twitter.com/ulkekodu",
      yt: "https://www.youtube.com/user/ulkekodu",
      config: "init",
      about: "",
      term: "",
      text: "",
      dir: "",
      phone: "",
      email: ""
    }
    await new Config(configInit).save();
  }

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
      show: showData,
      config: ((config != null) ? config._doc : {} )
    });

  }).catch( err => console.log(err));
  

});

router.get('/details', async (req, res, next) => {

  const config = await Config.findOne({ config: "init" });

  Country.findOne({ iso2: req.query.country })
    .then(data => {
      res.render('details', {
        title: data._doc.name || "Not found",
        country: data._doc || [],
        config: config._doc || {}
      });
    }).catch(err => {
      console.log(err)
    })
});

router.get('/contact', async (req, res, next) => {
  const config = await Config.findOne({ config: "init" });
  res.render('contact', {
    title: "Contact",
    config: config._doc || {}
  });
});

router.post('/contact', async (req, res, next) => {
  await new Contact(req.body).save();

  res.redirect('/contact');
});

router.get('/term', async (req, res, next) => {
  const config = await Config.findOne({ config: "init" });
  res.render('term', {
    title: "Term of Use",
    config: config._doc || {}
  });
});

router.get('/about', async (req, res, next) => {
  const config = await Config.findOne({ config: "init" });
  res.render('about', {
    title: "About Us",
    config: config._doc || {}
  });
});