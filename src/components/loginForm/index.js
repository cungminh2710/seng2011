import React from 'react'
import { Button, Form, Container, Divider, Icon, Message } from 'semantic-ui-react'
export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { view: 'login', loading: false };
	}
	toggleView(event) {
		event.preventDefault();
		let view = (this.state.view === 'register') ? 'login' : 'register';
		this.setState({ view, response: null });
	}
	onSubmit(event) {
		event.preventDefault();
		
		this.setState({ loading: true });
		let data = {
			password: this.state.password,
			email: this.state.email,
			passwordConfirm: this.state.passwordConfirm
		}
		let handler = (json) => {
			if (json.success) {
				localStorage.setItem('token', json.token);
				window.location = '/';
			}
			else
				this.setState({ response: json, loading: false });
		}
		let errorHandler = (err) => {
			this.setState({
				response: {
					success: false,
					message: err.message
				},
				loading: false
			});
		}
		if (this.state.view === 'register') {
			fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
				.then((response) => {
					if (response.status >= 400) {
						throw new Error("Bad response from server");
					}
					return response.json();
				})
				.then(handler)
				.catch(errorHandler);
		} else
			fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
				.then((response) => {
					if (response.status >= 400) {
						throw new Error("Bad response from server");
					}
					return response.json();
				})
				.then(handler)
				.catch(errorHandler);
		
	}
	onChange(e) {
		let target = e.target;
		this.setState({
			[target.name]: target.type === 'checkbox' ? target.checked : target.value
		});
	}
	render() {
		let dict = {
			register: {
				header: 'Welcome to our site!',
				headerContent: 'Register an Snail account',
				toggleText: 'Already signed up?'
			},
			login: {
				header: 'Welcome back!',
				headerContent: 'Login to your Snail account',
				toggleText: 'New to Snail?'
			}
		}
		let view = this.state.view;
		let thirdField = (view === 'login') ?
			null
			: <Form.Input type="password" name="passwordConfirm" label="Confirm Password" required onChange={this.onChange.bind(this)} />
		
		return (
			<Container text>
				<Message
					attached
					header={dict[view].header}
					content={dict[view].headerContent}
					color="orange"
				/>
		
				<Form
					size="large"
					className="attached fluid segment orange"
					success={this.state.response && this.state.response.success}
					error={this.state.response && !this.state.response.success}
				>
					<Form.Input type="email" name="email" label="Email" required onChange={this.onChange.bind(this)} />
					<Form.Input type="password" name="password" label="Password" required onChange={this.onChange.bind(this)} />
					{thirdField}
					<Button
						type='submit'
						onClick={this.onSubmit.bind(this)}
						color="orange"
						loading={this.state.loading}
					>
						Login with Email
					</Button>
					<Message
      					error
						header='Uh oh ...'
						content={(this.state.response) ? this.state.response.message : ''}
					/>
					<p><a href='#' onClick={this.toggleView.bind(this)}>{dict[view].toggleText}</a></p>
					
				</Form>
				<Message attached='bottom' info>
		
					<Icon name='help' />
					Forget your password?&nbsp;<a href="#">Click here</a>
			
				</Message>
		
			</Container>
		)
	}
}
