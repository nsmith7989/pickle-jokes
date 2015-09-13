var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var random = require('mongoose-random');

var JokeSchema = new Schema({
    title: String,
    text: String
});

JokeSchema.plugin(random, { path: 'r' });

module.exports = mongoose.model('Joke', JokeSchema);