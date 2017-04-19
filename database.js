//MAIN DATABASE
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

let hostname = 'localhost';

// import schema
const {
	user
} = require('./src/models');

let readyState = mongoose.connection.readyState;
if (readyState !== 1 || readyState !== 2)
	mongoose.connect(`mongodb://${hostname}/snail`);

let User = mongoose.model('user', user);
module.exports = {
	User
}