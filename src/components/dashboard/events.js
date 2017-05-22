import React from "react";
import { Feed, Icon, Header } from "semantic-ui-react";

export default class Events extends React.Component {
    render() {
        return (
            <div>
                <Header as="h2" content="Events" />
                <Feed>
                    <Feed.Event>
                        <Feed.Label>
                            <img src="https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg" />
                        </Feed.Label>
                        <Feed.Content>
                            <Feed.Summary>
                                <Feed.User>Let's Eat in Kingsford</Feed.User>

                                <Feed.Date>4 Hour Ago</Feed.Date>
                            </Feed.Summary>
                            <Feed.Extra text>
                                Anthony Mansour's Event
                            </Feed.Extra>
                            <Feed.Meta>
                                <Icon name="user" />
                                4 People in this event
                            </Feed.Meta>
                        </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                        <Feed.Label image="https://react.semantic-ui.com/assets/images/avatar/small/joe.jpg" />
                        <Feed.Content>
                            <Feed.Summary>
                                <a>Pizza is the best</a>
                                <Feed.Date>3 days ago</Feed.Date>
                            </Feed.Summary>
                            <Feed.Extra text>
                                Your event
                            </Feed.Extra>
                            <Feed.Meta>
                                <Icon name="user" />
                                5 People in this event
                            </Feed.Meta>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>
            </div>
        );
    }
}
