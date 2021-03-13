const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        console.log("Not User found or Account is disabled");
        return done(null, false, {
          message: "Not User found or Account is disabled.",
        });
      } else {
        const match = await user.matchPassword(password);
        if (match) {
          console.log(user);

          return done(null, user);
        } else {
          console.log("pass bad");

          return done(null, false, { message: "Incorrect Password." });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});