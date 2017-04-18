import React from 'react'
import { Card, Icon, Image  } from 'semantic-ui-react'
import moment from 'moment'
import extend from 'lodash/extend'

const cardStyle = {
	boxShadow: '0 20px 20px rgba(0,0,0,.08)',
	whiteSpace: 'normal',
	WebkitAnimation: 'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
	MozAnimation: 'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
	animation: 'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
	WebkitTransition: 'all 250ms cubic-bezier(.02, .01, .47, 1)',
    MozTransition: 'all 250ms cubic-bezier(.02, .01, .47, 1)',
    transition: 'all 250ms cubic-bezier(.02, .01, .47, 1)'
};

const hoverStyle = {
	boxShadow: '0 40px 40px rgba(0,0,0,.16)',
    transform: 'translate(0,-20px)',
    transitionDelay: '0s !important'
}

export default class ListingItemCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hover: false };
	}
	onMouseEnter() {
		this.setState({ hover: true });
	}
	onMouseLeave() {
		this.setState({ hover: false });
	}
	render() {
		let post = this.props.post;
		// let style = (this.state.hover) ? extend(cardStyle, hoverStyle) : cardStyle;
		return (
			<Card
				style={cardStyle}
				onMouseEnter={this.onMouseEnter.bind(this)}
				onMouseLeave={this.onMouseLeave.bind(this)}
			>
				<Image fluid src={post.thumbnail || 'http://react.semantic-ui.com/assets/images/avatar/large/elliot.jpg'}/>	
				<Card.Content>
					<Card.Header>
						{post.location_short}
					</Card.Header>
					<Card.Description>
						{post.title}
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<span>
						<Icon name='info' />
						{post.area}	m2
					</span>
					<span className='right floated'>
						<Icon name='money' />
						{post.price / 1000000} m VND / thang
					</span>
				</Card.Content>
			</Card>
		)
	}
}