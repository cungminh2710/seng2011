const jwt = require('jwt-simple');

const Model = require('../../database.js');
const config = require('../config.js');

/*
	POST /register
	body: {
		email: '...',
		password: '...',
		passwordConfirm: '...'
	}
	response: {
		success: true,
		message: 'err or welcome message'
	}
*/
let register = (req, res) => {
	const invalidate = form => {
		if (!form.email)
			return 'Please provide your email!';
		else if (!form.password)
			return 'Please provide your password!';
		else if (form.password <= 6)
			return 'Your password must be longer than 6 characters';
		else if (!form.passwordConfirm || form.password !== form.passwordConfirm)
			return 'Please confirm your password correctly!';
		return null;
	};

	const errorMessage = err => {
		if (err.code === 11000 || err.code === 11001)
			return 'This email  has already been used!';
		return 'Something wrong happened with creating your account. Please try again!'
	};

	let form = req.body;

	if (!invalidate(form)) {

		//registered
		const {
			email,
			password
		} = form;
		let newUser = new Model.User({
			email,
			password
		});
		newUser.save()
			.then(() => res.json({
				success: true,
				token: jwt.encode(email, config.secret),
				message: 'Welcome to Snail!'
			}))
			.catch(err => res.json({
				success: false,
				message: errorMessage(err)
			}));
	} else res.json({
		success: false,
		message: invalidate(form)
	});
};

/*
	POST /login
	body: {
		email: '...',
		password: '...'
	}
	response: {
		success: true/false,
		token: 'JWT...',
		email: '...',
		message: 'err || null'
	}
*/

let login = (req, res) => {
	let form = req.body;

	Model.User.findOne({
			email: form.email
		}).exec()
		.then(user => {
			if (!user)
				res.json({
					success: false,
					message: 'This email has not been registered!'
				});
			else if (!user.comparePassword(form.password))
				res.json({
					success: false,
					message: 'Wrong password!'
				});
			else {
				const {
					email,
				} = user;
				res.json({
					success: true,
					token: jwt.encode(email, config.secret),
					email,
				});
			}
		})
		.catch(err => res.json({
			success: false,
			message: 'Something wrong happened with logging in your account. Please try again!'
		}));
};

module.exports = {
	login,
	register
};