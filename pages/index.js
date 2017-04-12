import {
  Container,
  Header,
  Button
} from 'semantic-ui-react'
import Link from 'next/link'

export default () => (
  <Container text >
    <Header as='h2'>Snail</Header>
    <Button.Group>
      <Link href='/event/add'><Button>Create an event</Button></Link>
      <Button.Or />
      <Link href='/event/join'><Button positive>Join an event</Button></Link>
    </Button.Group>
  </Container>
)