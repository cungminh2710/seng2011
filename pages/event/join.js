import React from "react";
import Link from "next/link";
import {
    Button,
    Form,
    Container,
    Divider,
    Icon,
    Message
} from "semantic-ui-react";

export default class JoinEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false };
    }
    onChange(e) {
        let target = e.target;
        this.setState({
            [target.name]: target.type === "checkbox"
                ? target.checked
                : target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        // Fake server response
        setTimeout(_ => {
            window.location.href = `/event?name=Nurse foodies&_id=${this.state.code}`;
        }, 400);
    }
    render() {
        return (
            <Container text>
                <Message
                    attached
                    header="Join an event"
                    content="Enter event unique code below"
                    color="orange"
                />

                <Form
                    size="large"
                    className="attached fluid segment orange"
                    success={this.state.response && this.state.response.success}
                    error={this.state.response && !this.state.response.success}
                >
                    <Form.Input
                        type="text"
                        name="code"
                        label="Unique code"
                        required
                        onChange={this.onChange.bind(this)}
                    />
                    <Button
                        type="submit"
                        onClick={this.onSubmit.bind(this)}
                        color="orange"
                        loading={this.state.loading}
                    >
                        Join with code
                    </Button>
                </Form>
            </Container>
        );
    }
}
