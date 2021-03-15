const express = require('express');
const router = express.Router();
const passport = require("passport");
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Table = mongoose.model('Table');

module.exports = (app) => {
    app.use('/', router);
};

router.get('/auth', async (req, res, next) => {

    try {
        const user = await User.findOne({ name: "admin" });
        if (user == null) {
            const user = {
                name: "admin",
                email: "admin@admin.com",
                password: "admin123"
            }

            const table = {
                name: "1",
                flag: "1",
                iso2: "1",
                iso3: "1",
                isoNumeric: "1",
                geoNameId: "1",
                phoneCode: "1",
                continent: "1",
                capital: "1",
                currency: "1"
            }

            await new Table(table).save();
            const newUser = new User(user);
            newUser.password = await newUser.encryptPassword(user.password);
            await newUser.save();
        }
    } catch (error) {
        console.log(error)
    }
    res.render('login', {
        layout: 'private',
    });

});

router.post(
    "/auth",
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/auth",
        badRequestMessage: "Missing credentials.",
        failureFlash: false,
    }),
);

router.get("/auth/logout", async (req, res) => {
    req.logout();
    res.redirect("/");
});
