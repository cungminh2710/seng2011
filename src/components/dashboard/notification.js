import React from "react";
import { Feed, Icon, Header } from "semantic-ui-react";

export default class Notification extends React.Component {
    render() {
        return (
            <div>
                <Header as="h2" content="Notification" />
                <Feed>
                    <Feed.Event>
                        <Feed.Label>
                            <img src="https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg" />
                        </Feed.Label>
                        <Feed.Content>
                            <Feed.Summary>
                                <Feed.User>Anthony Mansour</Feed.User>
                                {" "}
                                added you as a friend
                                <Feed.Date>1 Hour Ago</Feed.Date>
                            </Feed.Summary>
                            <Feed.Meta>
                                <Feed.Like>
                                    <Icon name="like" />
                                    400 Likes
                                </Feed.Like>
                            </Feed.Meta>
                        </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                        <Feed.Label image="https://react.semantic-ui.com/assets/images/avatar/small/helen.jpg" />
                        <Feed.Content>
                            <Feed.Summary>
                                <a>Mirette Saleh</a>
                                {" "}
                                added
                                {" "}
                                <a>2 new illustrations</a>
                                <Feed.Date>4 days ago</Feed.Date>
                            </Feed.Summary>
                            <Feed.Extra images>
                                <a>
                                    <img src="https://react.semantic-ui.com/assets/images/avatar/small/matt.jpg" />
                                </a>
                                <a>
                                    <img src="https://react.semantic-ui.com/assets/images/avatar/small/stevie.jpg" />
                                </a>
                            </Feed.Extra>
                            <Feed.Meta>
                                <Feed.Like>
                                    <Icon name="like" />
                                    404 Like
                                </Feed.Like>
                            </Feed.Meta>
                        </Feed.Content>
                    </Feed.Event>
                    <Feed.Event>
                        <Feed.Label image="https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg" />
                        <Feed.Content>
                            <Feed.Summary
                                date="2 Days Ago"
                                user="Courteney Home"
                                content=" added you as a friend"
                            />
                            <Feed.Meta>
                                <Feed.Like>
                                    <Icon name="like" />
                                    408 Likes
                                </Feed.Like>
                            </Feed.Meta>
                        </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                        <Feed.Label image="https://react.semantic-ui.com/assets/images/avatar/small/joe.jpg" />
                        <Feed.Content>
                            <Feed.Summary>
                                <a>Shashika Rupasinghe</a> posted on his page
                                <Feed.Date>3 days ago</Feed.Date>
                            </Feed.Summary>
                            <Feed.Extra text>
                                Ours is a life of constant reruns. We're always circling back to where we'd we started, then starting all
                                over again. Even if we don't run extra laps that day, we surely will come back for more of the same another
                                day soon.
                            </Feed.Extra>
                            <Feed.Meta>
                                <Feed.Like>
                                    <Icon name="like" />
                                    501 Likes
                                </Feed.Like>
                            </Feed.Meta>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>
            </div>
        );
    }
}
