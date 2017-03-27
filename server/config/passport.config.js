import passportLocal from 'passport-local';
import passportFacebook from 'passport-facebook';
import User from '../api/user/user.model';
import WeddingPlanner from '../api/wedding_planner/wedding_planner.model';
import configAuth from './auth';

let FacebookStrategy = passportFacebook.Strategy;
let LocalStrategy = passportLocal.Strategy;

module.exports = (passport) => {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // FACEBOOK SIGNUP ============================================================
    // =========================================================================

    passport.use(new FacebookStrategy({

        //pulling in our app id and secret from auth.js file
        clientID            : configAuth.facebookAuth.clientID,
        clientSecret        : configAuth.facebookAuth.clientSecret,
        callbackURL         : configAuth.facebookAuth.callbackURL,
        profileFields       : ['id', 'displayName', 'photos', 'email'],
        passReqToCallback   : true
    },
    (token, refreshToken, profile, done) => {

        process.nextTick(() => {
            User.findOne({ 'facebook.id' : profile.id }, (err, user) => {
                if(err){
                    return done(err);
                }

                if(user){
                    return done(null, user);
                } else {
                    let newUser = new User();
                    newUser.name              = profile.displayName;
                    newUser.facebook.id       = profile.id;
                    newUser.facebook.token    = token;
                    newUser.facebook.name     = profile.displayName;
                    newUser.facebook.email    = profile.emails[0].value;
                    newUser.email             = profile.emails[0].value;
                    newUser.facebook.photo    = profile.photos[0].value;


                    newUser.save((err) => {
                        if(err) throw err;
                        return done(null, newUser)
                    });
                }
            });
        });
    }));



    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField       : 'email',
        passwordField       : 'password',
        passReqToCallback   : true // allows us to pass back the entire request to the callback
    },
    (req, email, password, done) => {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err) {
                    return done(err);
                }

                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false);
                } else {

                    // if there is no user with that email
                    // create the user
                    var newUser = new User();

                    // set the user's local credentials
                    newUser.email      = email;
                    newUser.password   = newUser.generateHash(password);
                    // save the user
                    newUser.save(function(err) {
                        if (err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });
        });
    }));

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField       : 'email',
        passwordField       : 'password',
        passReqToCallback   : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        console.log("Email:", email);
        console.log("Password:", password);
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err) {
                return done(err);
            }

            // if no user is found, return the message
            if (!user) {
                return done(null, false); // req.flash is the way to set flashdata using connect-flash
            }
            console.log('user:', user);
            // if the user is found but the password is wrong
            if (!user.validPassword(password)) {
                return done(null, false); // create the loginMessage and save it to session as flashdata
            }

            // all is well, return successful user
            console.log('before done call');
            return done(null, user);
        });
    }));

    passport.use('planner-local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField       : 'email',
        passwordField       : 'password',
        passReqToCallback   : true // allows us to pass back the entire request to the callback
    },
    (req, email, password, done) => {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            WeddingPlanner.findOne({ 'email' :  email }, function(err, planner) {
                // if there are any errors, return the error
                if (err) {
                    return done(err);
                }

                // check to see if theres already a user with that email
                if (planner) {
                    return done(null, false);
                } else {

                    // if there is no user with that email
                    // create the user
                    var newPlanner = new WeddingPlanner();

                    // set the user's local credentials
                    newPlanner.email      = email;
                    newPlanner.password   = newPlanner.generateHash(password);

                    // save the user
                    newPlanner.save(function(err) {
                        if (err) {
                            throw err;
                        }
                        return done(null, newPlanner);
                    });
                }
            });
        });
    }));

    passport.use('planner-local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField       : 'email',
        passwordField       : 'password',
        passReqToCallback   : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
      console.log("Email:", email);
      console.log("Password:", password);
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        WeddingPlanner.findOne({ 'email' :  email }, function(err, planner) {
            // if there are any errors, return the error before anything else
            if (err) {
                console.log('Error:', err);
                return done(err);
            }

            // if no user is found, return the message
            if (!planner) {
                console.log("Wedding Planner not found");
                return done(null, false); // req.flash is the way to set flashdata using connect-flash
            }

            // if the user is found but the password is wrong
            console.log(planner.validPassword(password));
            if (!planner.validPassword(password)) {
                console.log("Not a valid password");
                return done(null, false); // create the loginMessage and save it to session as flashdata
            }

            // all is well, return successful user
            return done(null, planner);
        });
    }));
};
