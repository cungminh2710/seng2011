import React from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'
import debounce from 'lodash/debounce'
import map from 'lodash/map'
require('isomorphic-fetch');

export default class SearchComponents extends React.Component {
	componentWillMount() {
		this.resetComponent()
	}
	resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

		// const handleResultSelect = (e, result) => this.setState({ value: result.id });
	found(results) {
		console.log(results);
		this.setState({
			isLoading: false,
			results
		})
	}
	handleSearchChange = (e, value) => {
		this.setState({ isLoading: true, value })

		debounce(() => {
			if (this.state.value.length < 1) return this.resetComponent();
			fetch('/api/place/search', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: value
				})
			})
				.then(response => response.json())
				.then(results => this.found(map(results, (result) => ({
							id: result.place_id,
							title: result.name,
							description: result.formatted_address,
							image: result.icon,
							price: result.rating
						})
						)
					)
				)
				.catch(error => { throw error });
		}, 500)();
	}
	render() {
		const { isLoading, value, results } = this.state;

		return (
			<Search
				loading={isLoading}
				// onResultSelect={this.handleResultSelect}
				onSearchChange={this.handleSearchChange}
				results={results}
				value={value}
				{...this.props}
			/>
		)
	}
}