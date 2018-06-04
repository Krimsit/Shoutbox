// Инициализация модулей
const mongoose = require('mongoose');
var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();

// Инициализация схемы MongoDB
const EntryModel = require('../models/Entry.model.js');

// Маршрут отображения страницы создания поста
exports.form = (req, res) => {
	res.render('post', {title: 'Post'});
};

// Маршрут публикации поста
exports.submit = (req, res, next) => {
	const data = req.body.entry;
	const user = res.locals.user;
	const username = user ? user.name : null;
	// Создание элемента базы данных
	const entry = new EntryModel({
		username: username,
		title: data.title,
		body: data.body
	});
	// Сохранение элемента в базу данных
	entry.save(function(err) {
		if (err) return err;

		console.log('Saved' + entry + '!');

		// Перенаправление на начальную страницу
		return res.redirect('/');
	});
};

// Маршрут главной страницы отображения постов
exports.list = (req, res, next) => {
	EntryModel.find({}, (err, entries) => {
		if (err) return err;

		res.render('entries', {
			title: 'Entries',
			entries: entries
		});
	});
};