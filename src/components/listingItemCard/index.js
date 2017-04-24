import React from 'react'
import { Card, Icon, Image, Rating, Button  } from 'semantic-ui-react'
import Link from 'next/link'
const cardStyle = {
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
				color="orange"
			>
					
				<Card.Content>
					<Image floated='right' size='mini' src={place.icon} />
					<Card.Header>
						{place.name}
					</Card.Header>
					<Card.Meta>
						<Rating disabled icon='star' defaultRating={place.rating} maxRating={place.rating} />
					</Card.Meta>
					<Card.Description>
						{place.formatted_address}
					</Card.Description>
				</Card.Content>

				<Card.Content extra>
					<Link href={"/place?place_id=" + place.place_id}><Button basic color='blue' content="View details"/></Link>
				</Card.Content>
			</Card>
		)
	}
}