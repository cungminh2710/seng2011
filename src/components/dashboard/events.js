import React from "react";
import { Feed, Icon, Header } from "semantic-ui-react";
import Link from "next/link";
import _ from "lodash";
import { isLogin } from "../../utils";

export default class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = { empty: true };
    }
    componentDidMount() {
        let token = isLogin();
        console.log(token);
        if (
            token ===
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImppbUBnbWFpbC5jb20i.RTVTPP2iS-KHldhYeg3NwQWhF8ri11os18LKUhFIhBU"
        )
            this.setState({ empty: false });
    }
    render() {
        let FeedComponent = this.state.empty
            ? <Feed.Event>
                  <Feed.Label>
                      <img src="https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg" />
                  </Feed.Label>
                  <Feed.Content>
                      <Feed.Summary>

                          <Link href="/event?name=Nurse foodies&_id=A123">
                              <Feed.User>
                                  food is life

                              </Feed.User>
                          </Link>

                          <Feed.Date>2 Minutes Ago</Feed.Date>
                      </Feed.Summary>
                      <Feed.Extra text>
                          Your Event
                      </Feed.Extra>
                      <Feed.Meta>
                          <Icon name="user" />
                          1 People in this event
                      </Feed.Meta>
                  </Feed.Content>
              </Feed.Event>
            : <Feed.Event>
                  <Feed.Label>
                      <img src="https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg" />
                  </Feed.Label>
                  <Feed.Content>
                      <Feed.Summary>

                          <Link href="/event?name=Nurse foodies&_id=A123&add=true">
                              <Feed.User>
                                  Nurse foodies

                              </Feed.User>
                          </Link>

                          <Feed.Date>4 Hour Ago</Feed.Date>
                      </Feed.Summary>
                      <Feed.Extra text>
                          Your Event
                      </Feed.Extra>
                      <Feed.Meta>
                          <Icon name="user" />
                          34 People in this event
                      </Feed.Meta>
                  </Feed.Content>
              </Feed.Event>;

        return (
            <div>
                <Header as="h2" content="Events" />
                <Feed>
                    {FeedComponent}
                </Feed>
            </div>
        );
    }
}
