import React from "react";
import moment from "moment";
import { Container, Header, Form, Button, Checkbox } from "semantic-ui-react";

export default class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            date: +moment()
        };
    }
    _onNameChange(e) {
        let value = e.target.value;
        this.setState({
            name: value
        });
    }
    _onDateChange(e) {
        let value = e.target.value;
        this.setState({
            date: +moment(value)
        });
    }
    _onSubmit(e) {
        e.preventDefault();
        let { name, date } = this.state;
        window.location.href = `/event?name=${name}&date=${date}&votes=[]`;
    }
    render() {
        return (
            <Container text>
                <Header as="h2"> Create your Event </Header> <Form>
                    <Form.Field>
                        <label> Event Name </label>
                        {" "}
                        <input
                            placeholder="First Name"
                            onChange={this._onNameChange.bind(this)}
                        />
                        {" "}
                    </Form.Field> <Form.Field>
                        <label> Date </label>
                        {" "}
                        <input
                            type="datetime-local"
                            onChange={this._onDateChange.bind(this)}
                        />
                        {" "}
                    </Form.Field> <Form.Field>
                        <Checkbox label="I agree to the Terms and Conditions" />
                    </Form.Field> <Button
                        type="submit"
                        onClick={this._onSubmit.bind(this)}
                    >
                        Submit{" "}
                    </Button>{" "}
                </Form>{" "}
            </Container>
        );
    }
}
