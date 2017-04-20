import React from 'react'
import { Container, Form, Message, Button } from 'semantic-ui-react'

export default class Forgot extends React.Component {
  render() {
    return (
      <Container text>
				<Message
					attached
					header="Forgot your password?"
					content="We will help you reset it"
					color="orange"
				/>
                <Form
					size="large"
					className="attached fluid segment orange"
				>
					<Form.Input type="email" name="email" label="Email" required/>
                    <Button
						type='submit'
						color="orange"
					>
						Send reset code
					</Button>
                </Form>
                </Container>
    )
  }
}