import React from "react";
import moment from "moment";
import { Container, Header, Form, Button, Checkbox } from "semantic-ui-react";

export default class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment()
        };
    }
    render() {
        return (
            <Container text>
                <Header as="h2">Create your Event</Header>
                <Form>
                    <Form.Field>
                        <label>Event Name</label>
                        <input placeholder="First Name" />
                    </Form.Field>
                    <Form.Field>
                        <label>Date</label>
                        <input type="datetime-local" />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label="I agree to the Terms and Conditions" />
                    </Form.Field>
                    <Button type="submit">Submit</Button>
                </Form>
            </Container>
        );
    }
}
