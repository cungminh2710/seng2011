import React from 'react'
import Link from 'next/link'
import { Container, Header, Card, Divider, Segment, Icon, Button, Image } from 'semantic-ui-react'
import { isLogin } from '../src/utils'
import ListingItemCard from '../src/components/listingItemCard'
require('isomorphic-fetch');

export default class MyPage extends React.Component {
  static async getInitialProps() {
    let response = await fetch('http://localhost:3000/api/place/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: 'restaurant'
      })
    });
    let places = [];
    if (response.status == 200) {
      places = await response.json();
    }
    return { places: places };
  }
  constructor(props) {
    super(props);
    this.state = { joinHref: '/account', createHref: '/account' };
  }
  componentDidMount() {
    if (isLogin()) {
      this.setState({
        joinHref: '/event/join',
        createHref: '/event/add'
      });
    } else {
      this.setState({
        joinHref: '/account',
        createHref: '/account'
      });
    }
  }
  render() {
    return (
      <Container>
        <Segment color='orange' textAlign="center">
          <Header as='h2' icon textAlign='center'>
            <Icon name='hand peace' circular />
            <Header.Content>
              Create a food event
            </Header.Content>
            <Header.Subheader>
              Create food events and find restaurants as a team
            </Header.Subheader>
          </Header>
          <Link prefetch href={this.state.createHref} ><Button color="orange" size="large">Create now!</Button></Link>
          <Link prefetch href={this.state.joinHref} ><Button color="orange" size="large">Join an event</Button></Link>
        </Segment>
        
        <Divider horizontal />
        
        <Header size='huge'>
          Popular Restaurant
          <Header.Subheader>
            Nearby restaurant
          </Header.Subheader>
        </Header>

        <Card.Group itemsPerRow={3}>
          {this.props.places.map((value, index) => (<ListingItemCard place={value} key={index} />))}
        </Card.Group>
      </Container>
    )
  }
}