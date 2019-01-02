const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose =  require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientId,
            clientSecret: keys.googleSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id })
                .then((existingUser) => {
                    if(existingUser) {
                        // user found
                        done(null, existingUser);
                    } else {
                        // new user, add it to the database
                        new User({
                                googleId: profile.id,
                                firstName: profile.name.givenName,
                                lastName: profile.name.familyName,
                                image: profile._json.image.url
                            })
                            .save()
                            .then(user => done(null, user));
                    }
                });
        }
    )
);
