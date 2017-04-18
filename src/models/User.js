const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
	email: {
		type: String,
		unique: true
	},
	access_token: String,
	password: {
		type: String,
		required: true
	}
});

User.pre('save', function (done) {
	let user = this;
	if (this.isModified('password') || this.isNew) {
		bcrypt.genSalt(10)
			.then(salt => {
				bcrypt.hash(user.password, salt)
					.then(hash => {
						user.password = hash;
						done();
					})
					.catch(err => done(err));
			})
			.catch(err => done(err));
	} else done();
});

User.methods.comparePassword = password => bcrypt.compare(password, this.password).then(isMatch => isMatch).catch(err => err);

module.exports = User;