const express = require('express');
const router = express.Router();
const path = require("path");
const mongoose = require('mongoose');
const Country = mongoose.model('Country');
const Table = mongoose.model('Table');

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

router.get('/dashboard/update/flag', authenticated.isAuthenticated, async (req, res, next) => {
    const data = await Country.findOne({ _id: req.query.id });

    res.render('edit-flag', {
        layout: "private",
        country: data._doc || []
    });
});

router.post('/dashboard/update/flag', authenticated.isAuthenticated, async (req, res, next) => {

    const { id } = req.body

    const flags = req.files.flag;


    let nombreCortado = flags.name.split(".");
    let extension = nombreCortado[nombreCortado.length - 1];
    let img = `/flag-${new Date().getMilliseconds()}_${Math.floor(Math.random() * 1000000)}.${extension}`;

    flags.mv(path.join(__dirname + "../../../public/flags" + img), err => {
        if (err) {
            console.log(err)
        }
        console.log('upload was successful')
    });

    await Country.findByIdAndUpdate(id, {
        flag: img
    })

    res.redirect('/dashboard');
});

router.get('/dashboard/update/table', authenticated.isAuthenticated, async (req, res, next) => {
    const data = await Table.find().limit(1);

    res.render('select', {
        layout: "private",
        table: data[0]._doc || []
    });
});

router.post('/dashboard/update/table', authenticated.isAuthenticated, async (req, res, next) => {

    const { id } = req.body

    await Table.findByIdAndUpdate(id, {
        ...req.body
    })

    res.redirect('/dashboard');
});