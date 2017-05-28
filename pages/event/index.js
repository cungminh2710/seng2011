import React from "react";
import {
    Container,
    Header,
    Icon,
    Divider,
    Button,
    Segment,
    Grid,
    Menu,
    List,
    Loader,
    Image,
    Form,
    Card,
    Rating,
    Label
} from "semantic-ui-react";
import _ from "lodash";
import moment from "moment";
import { isLogin } from "../../src/utils";
const cardStyle = {
    boxShadow: "0 5px 5px rgba(0,0,0,.08)",
    whiteSpace: "normal",
    WebkitAnimation: "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
    MozAnimation: "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
    animation: "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
    WebkitTransition: "all 250ms cubic-bezier(.02, .01, .47, 1)",
    MozTransition: "all 250ms cubic-bezier(.02, .01, .47, 1)",
    transition: "all 250ms cubic-bezier(.02, .01, .47, 1)"
};

export default class EventPage extends React.Component {
    static async getInitialProps(req) {
        let query = req.query || {};
        let colors = [
            "red",
            "teal",
            "blue",
            "green",
            "yellow",
            "black",
            "grey",
            "pink"
        ];
        return {
            name: query.name || "Event Name",
            id: query._id || "21312",
            date: +query.date || moment.now(),
            votes: query.votes
                ? []
                : query.add
                      ? [
                            {
                                name: "Regent Hotel",
                                votes: 2,
                                id: "02862d41c96b43da21458ffda7f9698dee6430be"
                            },
                            {
                                name: "McDonald's Kingsford",
                                votes: 0,
                                id: "3555111bb93f6b096e8abccfab9514ce6f7f2d05"
                            }
                        ]
                      : [
                            {
                                name: "Regent Hotel",
                                votes: 2,
                                id: "02862d41c96b43da21458ffda7f9698dee6430be"
                            }
                        ]
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            price_level: 0,
            rating: 0,
            places: [],
            pinned: null
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
    _onAdd(_place) {
        let { votes } = this.state;
        let place = {
            id: _place.id,
            name: _place.name,
            votes: 0
        };
        votes.push(place);
        this.setState({ votes });
    }
    _onPin(vote) {
        let token = isLogin();
        if (
            token !==
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImppbUBnbWFpbC5jb20i.RTVTPP2iS-KHldhYeg3NwQWhF8ri11os18LKUhFIhBU"
        )
            this.setState({ pinned: vote });
    }
    _onVote(vote) {
        // console.log(vote);
        if (vote.voted) return;
        let votes = this.state.votes;
        for (let index in votes) {
            if (votes[index].id == vote.id) {
                votes[index].votes++;
                votes[index].voted = true;
            }
        }
        this.setState({ votes });
    }
    render() {
        let { name, date, votes, pinned, id } = this.state;
        let pinnedComponent = pinned
            ? <Header sub content={pinned.name} color="orange" />
            : <Header sub content="No pinned venue" />;
        return (
            <Container fluid style={{ padding: 20 }}>
                <Grid columns={2}>
                    <Grid.Column width={10}>
                        <Header as="h2">
                            Event Name: {name} - Code: {id}
                        </Header>
                        <Header sub>Time: {moment(date).calendar()}</Header>

                        <Header as="h2" content="Pinned Venue" />
                        {pinnedComponent}
                        <Header as="h2" content="Votes" />
                        <List>
                            {votes.map(v => (
                                <List.Item as="a" key={v.id + v.votes}>
                                    <Button
                                        disabled={v.voted}
                                        basic
                                        animated
                                        key={v.id + "aa"}
                                        onClick={this._onVote.bind(this, v)}
                                    >
                                        <Button.Content visible>
                                            <Icon name="plus" />
                                        </Button.Content>
                                        <Button.Content hidden>
                                            Vote
                                        </Button.Content>
                                    </Button>

                                    <Button
                                        basic
                                        animated
                                        key={v.id + "bb"}
                                        onClick={this._onPin.bind(this, v)}
                                    >
                                        <Button.Content visible>
                                            <Icon name="checkmark" />
                                        </Button.Content>
                                        <Button.Content hidden>
                                            Pin
                                        </Button.Content>
                                    </Button>

                                    {v.name} - {v.votes} votes
                                </List.Item>
                            ))}
                        </List>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Segment>
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
                                        onChange={this._onRadioChange.bind(
                                            this,
                                            1
                                        )}
                                    />
                                    <Form.Field
                                        label="Average"
                                        control="input"
                                        type="radio"
                                        name="price_level"
                                        onChange={this._onRadioChange.bind(
                                            this,
                                            2
                                        )}
                                    />
                                    <Form.Field
                                        label="Expensive"
                                        control="input"
                                        type="radio"
                                        name="price_level"
                                        onChange={this._onRadioChange.bind(
                                            this,
                                            3
                                        )}
                                    />
                                    <Form.Field
                                        label="Very Expensive"
                                        control="input"
                                        type="radio"
                                        name="price_level"
                                        onChange={this._onRadioChange.bind(
                                            this,
                                            4
                                        )}
                                    />
                                </Form.Group>
                                <Form.Field width={2}>
                                    <label>Rating</label>
                                    <input
                                        type="number"
                                        max={5}
                                        min={1}
                                        onChange={this._onRatingChange.bind(
                                            this
                                        )}
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
                                    {this.state.places.map((place, index) => (
                                        <Card
                                            style={cardStyle}
                                            color="orange"
                                            key={index}
                                        >

                                            <Card.Content>
                                                <Image
                                                    floated="right"
                                                    size="mini"
                                                    src={place.icon}
                                                />
                                                <Card.Header>
                                                    {place.name}
                                                </Card.Header>
                                                <Card.Meta>
                                                    <Rating
                                                        disabled
                                                        icon="star"
                                                        rating={place.rating}
                                                        maxRating={5}
                                                    />
                                                </Card.Meta>
                                                <Card.Description>
                                                    {place.vicinity}
                                                </Card.Description>
                                            </Card.Content>

                                            <Card.Content extra>
                                                <Button
                                                    basic
                                                    color="blue"
                                                    content="Add"
                                                    onClick={this._onAdd.bind(
                                                        this,
                                                        place
                                                    )}
                                                />
                                            </Card.Content>
                                        </Card>
                                    ))}
                                </Card.Group>
                            </Segment>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}
