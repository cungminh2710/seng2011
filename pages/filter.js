import React from "react";
import {
    Container,
    Header,
    Icon,
    Divider,
    Form,
    Button,
    Segment,
    Card,
    Loader
} from "semantic-ui-react";
import Search from "../src/components/search";
import ListingItemCard from "../src/components/listingItemCard";
export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price_level: 0,
            rating: 0,
            loading: false,
            places: [],
            error: null
        };
    }
    _onRadioChange(value) {
        this.setState({ price_level: value });
    }
    _onRatingChange(e) {
        let target = e.target;
        this.setState({
            rating: target.type === "checkbox" ? target.checked : +target.value
        });
    }
    _onSubmit(e) {
        e.preventDefault();
        let { price_level, rating } = this.state;
        let handler = json => {
            this.setState({ places: json });
        };
        let errorHandler = error => {
            this.setState({ error });
        };
        fetch("/api/place/filter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ price_level, rating })
        })
            .then(response => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(handler)
            .catch(errorHandler);
    }
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
                            onChange={this._onRadioChange.bind(this, 1)}
                        />
                        <Form.Field
                            label="Average"
                            control="input"
                            type="radio"
                            name="price_level"
                            onChange={this._onRadioChange.bind(this, 2)}
                        />
                        <Form.Field
                            label="Expensive"
                            control="input"
                            type="radio"
                            name="price_level"
                            onChange={this._onRadioChange.bind(this, 3)}
                        />
                        <Form.Field
                            label="Very Expensive"
                            control="input"
                            type="radio"
                            name="price_level"
                            onChange={this._onRadioChange.bind(this, 4)}
                        />
                    </Form.Group>
                    <Form.Field width={2}>
                        <label>Rating</label>
                        <input
                            type="number"
                            max={5}
                            min={1}
                            onChange={this._onRatingChange.bind(this)}
                        />
                    </Form.Field>
                    <Form.Field
                        control={Button}
                        onClick={this._onSubmit.bind(this)}
                    >
                        Submit
                    </Form.Field>
                </Form>
                <Header as="h2">
                    Results
                </Header>
                <Segment>
                    <Card.Group itemsPerRow={3}>
                        {this.state.places.map((value, index) => (
                            <ListingItemCard place={value} key={index} />
                        ))}
                    </Card.Group>
                </Segment>
            </Container>
        );
    }
}
