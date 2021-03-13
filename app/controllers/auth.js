const express = require('express');
const router = express.Router();
const passport = require("passport");
const mongoose = require('mongoose');
const User = mongoose.model('User');

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

            const newUser = new User(user);
            newUser.password = await newUser.encryptPassword(user.password);
            await newUser.save();
        }
        console.log("ADD SUCCESS")
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
        failureFlash: true,
    }),
);

router.get("/auth/logout", async (req, res) => {
    req.logout();
    res.redirect("/auth");
});
