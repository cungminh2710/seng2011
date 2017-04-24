import React from 'react'
import { Button, Form, Container, Divider, Icon, Message, Grid } from 'semantic-ui-react'
import Search from '../search'
import { logout } from '../../utils'
import Dashboard from './dashboard'
import Notification from './notification'

export default class MyAccount extends React.Component {
	constructor(props) {
		super(props);
		this.state = { view: 'dashboard' };
	}
	onLogout(e) {
		e.preventDefault();
		logout()
	}
	switchView = (view) => (e) => {
		console.log(view);
		this.setState({ view });
	}
	render() {
		let { view } = this.state
		let viewComponent;
		switch (view) {
			case 'dashboard':
				viewComponent = <Dashboard />
				break;
			case 'notification':
				viewComponent = <Notification />
				break;
			default:
				viewComponent = <Dashboard />
				break;
		}
		return (
			<Container>
				<Grid>
					<Grid.Column width={10}>
						{viewComponent}	
					</Grid.Column>
					<Grid.Column width={6}>
						<Button.Group attached='top' vertical color="orange" size="large">
							<Button onClick={this.switchView('dashboard')} icon="dashboard" content="My Account" labelPosition="right" active={view === 'dashboard'}/>
							<Button onClick={this.switchView('notification')} icon="inbox" content="Notifications" labelPosition="right" active={view === 'notification'}/>
							<Button onClick={this.switchView('events')} icon="calendar" content="Events" labelPosition="right" active={view === 'events'}/>
							<Button onClick={this.onLogout} icon="power" content="Log out" labelPosition="right"/>
						</Button.Group>
					</Grid.Column>
				</Grid>
			</Container>
		)
	}
}