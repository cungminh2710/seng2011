import React from "react";
import { Container, Header, Icon, Divider } from "semantic-ui-react";
import LoginForm from "../src/components/loginForm";
import Dashboard from "../src/components/dashboard";
import { isLogin } from "../src/utils";

export default class MyAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = { component: "Loading" };
    }
    componentDidMount() {
        let token = isLogin();
        let component = token ? <Dashboard /> : <LoginForm />;
        this.setState({ component });
    }
    render() {
        return (
            <Container text textAlign="center">
                {this.state.component}
            </Container>
        );
    }
}
