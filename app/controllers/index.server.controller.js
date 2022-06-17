let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//user model instance
let userModel = require('../model/user');
let User = userModel.User;


function displayName(req) {
    return req.user ? req.user.displayName : ''
}


exports.home = function (req, res, next) {
    res.render('index', {title: 'Home', displayName: displayName(req)});
}

exports.about = function (req, res, next) {
    res.render('index', {title: 'About', displayName: displayName(req)});
}

exports.projects = function (req, res, next) {
    res.render('index', {title: 'Projects', displayName: displayName(req)});
}

exports.services = function (req, res, next) {
    res.render('index', {title: 'Services', displayName:displayName(req)});
}

exports.contact = function (req, res, next) {
    res.render('index', {title: 'Contact Me', displayName: displayName(req)});
}

//showing the login page
module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if (!req.user) {
        res.render('auth/login',
            {
                title: "Login",
                messages: req.flash('loginMessage'),
                displayName: displayName(req)
            })
    } else {
        return res.redirect('/');
    }
}

//processing the login page
module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            if (err) //if there's an error
            {
                return next(err);
            }
            if (!user) //if there's a user login error
            {
                req.flash('loginMessage', 'Authentication Error. Please check and enter valid information.');
                return res.redirect('/login');
            }
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.redirect('/business-contact');
            });
        })(req, res, next);
}

//showing the diaplay page
module.exports.displayRegisterPage = (req, res, next) => {
    //login status
    if (!req.user) {
        res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: displayName(req)
            });
    } else {
        return res.redirect('/');
    }
}

//processing the register page
module.exports.processRegisterPage = (req, res, next) => {
    //create an object for the user
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log("Error: Inserting New User");
            if (err.name == "UserExistsError") {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('auth/register',
                {
                    title: 'Register',
                    messages: req.flash('registerMessage'),
                    displayName: displayName(req)
                });
        } else {
            //redirect and authenticate user if there is no error
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/business-contact')
            });
        }
    });
}

//performing the loging out process
module.exports.performLogout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}


