const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Country = mongoose.model('Country');

const authenticated = require("../utlis/validation");


module.exports = (app) => {
    app.use('/', router);
};

router.get('/dashboard', authenticated.isAuthenticated, async (req, res, next) => {

    const data = await Country.find();
    var dataFormat = [];

    for (let index = 0; index < data.length; index++) {
        dataFormat.push(data[index]._doc);
    }

    res.render('home', {
        layout: "private",
        country: dataFormat || []
    });
});

router.get('/dashboard/update', authenticated.isAuthenticated, async (req, res, next) => {
    const data = await Country.findOne({ _id: req.query.id });

    res.render('edit', {
        layout: "private",
        country: data._doc || []
    });
});

router.post('/dashboard/update', authenticated.isAuthenticated, async (req, res, next) => {

    const { id } = req.body

    await Country.findByIdAndUpdate(id, {
        ...req.body
    })

    res.redirect('/dashboard/update?id=' + id);

});
