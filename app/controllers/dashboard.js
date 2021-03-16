const express = require('express');
const router = express.Router();
const path = require("path");
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Country = mongoose.model('Country');
const Table = mongoose.model('Table');
const Config = mongoose.model('Config');
const Contact = mongoose.model('Contact');
const User = mongoose.model('User');

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

router.get('/dashboard/config', authenticated.isAuthenticated, async (req, res, next) => {
    const data = await Config.find().limit(1);

    res.render('config', {
        layout: "private",
        config: data[0]._doc || []
    });
});

router.post('/dashboard/config', authenticated.isAuthenticated, async (req, res, next) => {

    const { id } = req.body

    await Config.findByIdAndUpdate(id, {
        ...req.body
    })

    res.redirect('/dashboard');
});

router.get('/dashboard/messages', authenticated.isAuthenticated, async (req, res, next) => {
    const data = await Contact.find();
    var dataFormat = [];

    for (let index = 0; index < data.length; index++) {
        dataFormat.push(data[index]._doc);
    }
    res.render('messages', {
        layout: "private",
        data: dataFormat || []
    });
});

router.get('/dashboard/change', authenticated.isAuthenticated, async (req, res, next) => {
    const data = await User.find().limit(1);

    res.render('change', {
        layout: "private",
        q: data[0]._doc || []
    });
});

router.post('/dashboard/change', authenticated.isAuthenticated, async (req, res, next) => {

    const { password, email, id } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await User.updateOne(
        { _id: id },
        { $set: { password: hash, email: email } },
        { new: true }
    );

    res.redirect('/dashboard');
});