import React from "react";
import {
    Container,
    Button,
    Header,
    Icon,
    Segment,
    Rating,
    Card,
    Image,
    Statistic,
    Divider,
    Grid,
    List,
    Label,
    Loader,
    Dropdown,
    Modal
} from "semantic-ui-react";

class ReviewCard extends React.Component {
    render() {
        let { review } = this.props;
        return (
            <Card color="orange">
                <Card.Content>
                    <Image
                        floated="right"
                        size="mini"
                        src={review.profile_photo_url}
                    />
                    <Card.Header>
                        {review.author_name}
                    </Card.Header>
                    <Card.Meta>
                        <Rating
                            maxRating={review.rating}
                            defaultRating={review.rating}
                            disabled
                        />
                    </Card.Meta>
                    <Card.Description>
                        {review.text}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    {review.relative_time_description}
                </Card.Content>
            </Card>
        );
    }
}

import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
const DetailGoogleMap = withScriptjs(
    withGoogleMap(props => {
        return (
            <GoogleMap
                ref={props.onMapMounted}
                defaultZoom={17}
                center={props.center}
            >
                {props.markers
                    .map((marker, index) => ({
                        position: marker,
                        animation: google.maps.Animation.DROP
                    }))
                    .map((marker, index) => (
                        <Marker
                            {...marker}
                            key={index}
                            onRightClick={() => props.onMarkerRightClick(index)}
                        />
                    ))}
            </GoogleMap>
        );
    })
);

export default class PlaceDetails extends React.Component {
    static async getInitialProps(req) {
        let place_id = req.query.place_id;
        let response = await fetch("http://localhost:8000/api/place/details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                placeid: place_id
            })
        });
        let place = {};
        if (response.status == 200) {
            place = await response.json();
        }
        if (!place.reviews) place.reviews = [];
        return { place: place };
    }
    handleClose() {
        window.location.href = "/event?name=Nurse foodies&_id=A123&add=true";
    }
    render() {
        let { place } = this.props;
        if (!place.opening_hours) {
            place.opening_hours = {
                open_now: false,
                weekday_text: []
            };
        }
        return (
            <Container fluid style={{ padding: 30 }}>
                <Header as="h2" icon textAlign="center">
                    <Icon name="food" color="orange" />
                    {place.name}
                    <Header.Subheader>
                        <Rating
                            icon="star"
                            maxRating={place.rating}
                            defaultRating={place.rating}
                            disabled
                        />
                    </Header.Subheader>
                </Header>

                <Divider horizontal />

                <Grid columns={2}>

                    <Grid.Column width={6}>
                        <Segment raised>
                            <Label as="a" color="orange" ribbon>
                                Overview
                            </Label>
                            <Header content={place.name} as="h2" />
                            <Header content={place.vicinity} sub />

                            <Divider horizontal />
                            <Label
                                as="a"
                                color="red"
                                ribbon
                                icon="marker"
                                content="Address"
                            />
                            <span>{place.formatted_address}</span>

                            <Divider horizontal />
                            <Modal
                                trigger={
                                    <Button color="green">
                                        Add to Event
                                    </Button>
                                }
                                basic
                                closeOnDimmerClick={false}
                                size="small"
                            >
                                <Header
                                    icon="browser"
                                    content="You have one event"
                                />
                                <Modal.Content>

                                    Do you want to add this restaurant to {" "}
                                    <Dropdown
                                        upward
                                        floating
                                        inline
                                        options={[
                                            {
                                                key: "Nurse foodies",
                                                text: "Nurse foodies",
                                                value: "Nurse foodies"
                                            }
                                        ]}
                                        defaultValue="Nurse foodies"
                                    />

                                </Modal.Content>
                                <Modal.Actions>
                                    <Button
                                        color="green"
                                        onClick={this.handleClose}
                                        inverted
                                    >
                                        <Icon name="checkmark" /> Do it
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                            <Divider horizontal />
                            <Label
                                as="a"
                                color="grey"
                                ribbon
                                icon="clock"
                                content={
                                    place.opening_hours.open_now
                                        ? "Open Now"
                                        : "Closed"
                                }
                            />
                            <Divider horizontal />
                            <Label
                                as="a"
                                color="green"
                                ribbon
                                icon="phone"
                                content="Phone"
                            />
                            <span>{place.international_phone_number}</span>
                            <Divider horizontal />
                            <Label
                                as="a"
                                color="yellow"
                                ribbon
                                icon="star"
                                content="Rating"
                            />
                            <Rating
                                icon="star"
                                maxRating={5}
                                defaultRating={place.rating}
                                disabled
                            />
                            <Divider horizontal />
                            <Label
                                as="a"
                                color="orange"
                                ribbon
                                icon="usd"
                                content="Price Rating"
                            />
                            <Rating
                                icon="heart"
                                maxRating={4}
                                defaultRating={5 - place.price_level}
                                disabled
                            />

                            <Divider horizontal />
                            <Label
                                as="a"
                                color="black"
                                ribbon
                                icon="clock"
                                content="Opening Hours"
                            />
                            <List>
                                {place.opening_hours.weekday_text.map(
                                    (value, index) => (
                                        <List.Item key={value}>
                                            {value}
                                        </List.Item>
                                    )
                                )}
                            </List>
                            <Divider horizontal />
                            <Label
                                as="a"
                                color="blue"
                                ribbon
                                icon="linkify"
                                content="Website"
                            />
                            <span>
                                <a href={place.website} target="_blank">
                                    {place.website}
                                </a>
                            </span>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <DetailGoogleMap
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBbf8SUfyWfP_6UzhQx74CkMyn7sJwIMcw&libraries=geometry,places"
                            loadingElement={
                                <div style={{ height: `700px` }}>
                                    <Loader />
                                </div>
                            }
                            containerElement={
                                <div style={{ height: `700px` }} />
                            }
                            mapElement={<div style={{ height: `700px` }} />}
                            center={place.geometry.location}
                            markers={[place.geometry.location]}
                        />
                    </Grid.Column>
                </Grid>

                <Divider horizontal />
                <Container
                    textAlign="center"
                    fluid
                    // style={{ padding: 100 }}
                >
                    <Statistic
                        value={place.reviews.length}
                        label="Reviews"
                        color="orange"
                    />
                    <Divider />
                    <Card.Group itemsPerRow={3}>
                        {place.reviews.map((value, index) => (
                            <ReviewCard review={value} key={index} />
                        ))}
                    </Card.Group>
                </Container>

            </Container>
        );
    }
}
