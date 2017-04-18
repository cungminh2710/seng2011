import React from 'react'
import { Menu, Container, Input } from 'semantic-ui-react'
import Link from 'next/link'

const menuStyle = {
	height: '66px',
	boxShadow: '0px 2px 40px 0px rgba(0,0,0,0.08)',
	background: 'rgba(255,255,255,.9)',
	WebkitBackdropFilter: 'blur(20px)',
	padding: '0px 0px 0px 24px',
};

const itemStyle = {
	color: 'rgba(252,62,44,.5)'
}

const logoStyle = {
	color: 'rgba(242,113,28,.95)'
}

export default class Navbar extends React.Component {
	render() {
		return (
			<Menu fixed='top' fluid size='large' borderless style={menuStyle}>
				<a href="/" className="header item" style={logoStyle}>
					Snail
				</a>
				<Menu.Menu position='right'>
					<Menu.Item>
						<Input icon='search' placeholder='Search location' />
					</Menu.Item>	
					<Menu.Item >
						<Link prefetch href="/account" style={itemStyle}>
							<a style={itemStyle}>My Account</a>
						</Link>
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		)
	}
}