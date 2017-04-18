import React from 'react'
import Link from 'next/link'
import { Container, Header, Card, Divider, Segment, Icon, Button, Image } from 'semantic-ui-react'

export default class MyPage extends React.Component {
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
          <Link prefetch href="/account" ><Button color="orange" size="large">Create now!</Button></Link>
          <Link prefetch href="/account" ><Button color="orange" size="large">Join an event</Button></Link>
        </Segment>
        
        <Divider horizontal />
        
        <Header size='huge'>
          Popular Restaurant
          <Header.Subheader>
            Recent accomodation listing
          </Header.Subheader>
        </Header>
      </Container>
    )
  }
}