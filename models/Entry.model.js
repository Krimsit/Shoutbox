// Инициализация модулей
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Создание схемы поста
const Entry = new Schema({
	username: String,
	title: String,
	body: String
}, {
  versionKey: false,
  collection: "EntryCollection"
});

module.exports = mongoose.model('EntryModel', Entry);