import React from "react";
import { Search, Grid, Header } from "semantic-ui-react";
import debounce from "lodash/debounce";
import map from "lodash/map";
import slice from "lodash/slice";

require("isomorphic-fetch");

export default class SearchComponents extends React.Component {
    componentWillMount() {
        this.resetComponent();
    }
    resetComponent = () =>
        this.setState({ isLoading: false, results: [], value: "" });

    handleResultSelect = (e, result) => {
        window.location = "/place?place_id=" + result.id;
    };

    found(results) {
        console.log(results);
        this.setState({
            isLoading: false,
            results
        });
    }
    handleSearchChange = (e, value) => {
        this.setState({ isLoading: true, value });

        debounce(() => {
            if (this.state.value.length < 1) return this.resetComponent();
            fetch("/api/place/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: value
                })
            })
                .then(response => response.json())
                .then(results =>
                    this.found(
                        map(results, result => ({
                            id: result.place_id,
                            title: result.name,
                            description: result.formatted_address,
                            image: result.icon,
                            price: result.rating
                        }))
                    )
                )
                .catch(error => {
                    throw error;
                });
        }, 500)();
    };
    render() {
        const { isLoading, value, results } = this.state;

        return (
            <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={slice(results, 0, 5)}
                value={value}
                minCharacters={2}
                {...this.props}
            />
        );
    }
}
