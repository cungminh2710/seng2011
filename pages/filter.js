import React from "react";
import {
    Container,
    Header,
    Icon,
    Divider,
    Form,
    Button
} from "semantic-ui-react";
import Search from "../src/components/search";
export default class Filter extends React.Component {
    render() {
        return (
            <Container>
                <Header as="h2">
                    Text Search
                </Header>
                <Search />

                <Divider horizontal />
                <Header as="h2">
                    Filter Search

                </Header>
                <Form>
                    <Form.Group grouped widths="equal">
                        <label>Price Level</label>
                        <Form.Field
                            label="Cheap"
                            control="input"
                            type="radio"
                            name="price_level"
                        />
                        <Form.Field
                            label="Average"
                            control="input"
                            type="radio"
                            name="price_level"
                        />
                        <Form.Field
                            label="Expensive"
                            control="input"
                            type="radio"
                            name="price_level"
                        />
                        <Form.Field
                            label="Very Expensive"
                            control="input"
                            type="radio"
                            name="price_level"
                        />
                    </Form.Group>
                    <Form.Field width={2}>
                        <label>Quantity</label>
                        <input type="number" max={5} min={1} />
                    </Form.Field>
                    <Form.Field control={Button}>Submit</Form.Field>
                </Form>
            </Container>
        );
    }
}
