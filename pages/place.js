import React from 'react'
import { Container, Message, Button, Header, Icon, Segment, Rating, List, Card, Image,Statistic } from 'semantic-ui-react'

class ReviewCard extends React.Component {
	render() {
		let { review } = this.props;
		return (
			<Card color="orange">
				<Card.Content>
					<Image floated='right' size='mini' src={review.profile_photo_url} />
					<Card.Header>
						{review.author_name}
					</Card.Header>
					<Card.Meta>
					
						<Rating maxRating={review.rating} defaultRating={review.rating} disabled />
						
					</Card.Meta>
					<Card.Description>
						{review.text}
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					{review.relative_time_description}
				</Card.Content>
			</Card>
		)
	}
}

export default class PlaceDetails extends React.Component {
	static async getInitialProps(req) {
		let place_id = req.query.place_id;
		let response = await fetch('http://localhost:3000/api/place/details', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				placeid: place_id
			})
		});
		let place = {};
		if (response.status == 200) {
			place = await response.json();
		}
		return { place: place };
	}
	render() {
		let { place } = this.props;
		return (
			<Container textAlign="center">
				<Header as='h2' icon>
					<Icon name='food' color="orange" />
					{place.name}
					<Header.Subheader>
						<Rating icon="star" maxRating={place.rating} defaultRating={place.rating} disabled />
					</Header.Subheader>

					<Button color="blue" basic><a href={place.url} target="_blank">View on Google Maps</a></Button>
				</Header>
				<List>
							{place.opening_hours.weekday_text.map((value, index) => <List.Item>{value}</List.Item>)}	
						</List>
				<List size="large" animated>
					<List.Item>
						<List.Icon name='food' />
						<List.Content>{place.name}</List.Content>
					</List.Item>
					<List.Item>
						<List.Icon name='marker' />
						<List.Content>{place.vicinity}</List.Content>
					</List.Item>
					<List.Item>
						<List.Icon name='phone' />
						<List.Content>{place.international_phone_number}</List.Content>
					</List.Item>
					<List.Item>
						<List.Icon name='usd' />
						<List.Content><Rating icon="heart" maxRating={place.price_level} defaultRating={place.price_level} disabled /></List.Content>
					</List.Item>
					<List.Item>
						<List.Icon name='star' />
						<List.Content><Rating icon="star" maxRating={place.rating} defaultRating={place.rating} disabled /></List.Content>
					</List.Item>
					<List.Item>
						<List.Icon name='linkify' />
						<List.Content>
							<a href={place.website} target="_blank">{place.website}</a>
						</List.Content>
					</List.Item>
					<List.Item>
						<List.Icon name='clock' />
						<List.Content>{place.opening_hours.open_now ? 'Open Now' : 'Closed'}</List.Content>
					</List.Item>
				</List>
				<Statistic value={place.reviews.length} label='Reviews' color="orange" />
				<Card.Group itemsPerRow={2}>
					{place.reviews.map((value, index) => (<ReviewCard review={value} key={index} />))}
				</Card.Group>
			</Container>
		)
	}
}