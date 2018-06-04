// Configuring Passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const UsersModel = require('../models/Users.model');

exports.form = (req, res) => {
	res.render('login', {title: 'Login'});
}

exports.submit = (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;
	
}