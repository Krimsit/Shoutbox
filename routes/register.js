// Инициализация модулей
const mongoose = require('mongoose');
var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();

const UsersModel = require('../models/Users.model');

exports.form = (req, res) => {
	res.render('register', { title: 'Register', error: 'Fill in the form below to sign up!' });
};

exports.submit = (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	UsersModel.findOne({ username: username }, (err, user) => {
		if(err) return next(err);

		if(user) {
			res.render('register', { title: 'Register', error: 'Username already taken!' });
		}	else {
			user = new UsersModel({
				username: username,
				password: password
			});
			user.save((err) => {
				if(err) return next(err);

				req.session.uid = user.id;
				console.log('Users Saved!');
				res.redirect('/');
			});
		}
	});
};