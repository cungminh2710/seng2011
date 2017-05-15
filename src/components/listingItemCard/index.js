import React from 'react'
import { Card, Icon, Image  } from 'semantic-ui-react'

const cardStyle = {
	boxShadow: '0 5px 5px rgba(0,0,0,.08)',
	whiteSpace: 'normal',
	WebkitAnimation: 'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
	MozAnimation: 'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
	animation: 'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
	WebkitTransition: 'all 250ms cubic-bezier(.02, .01, .47, 1)',
    MozTransition: 'all 250ms cubic-bezier(.02, .01, .47, 1)',
    transition: 'all 250ms cubic-bezier(.02, .01, .47, 1)'
};

export default class ListingItemCard extends React.Component {
	render() {
		let place = this.props.place;
		return (
			<Card
				style={cardStyle}
			>
				<Card.Content>
					<Card.Header>
						{place.name}
					</Card.Header>
					<Card.Description>
						{place.vicinity}
						</Card.Description>
				</Card.Content>
			</Card>
		)
	}
}