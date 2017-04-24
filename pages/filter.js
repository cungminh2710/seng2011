import React from 'react'
import { Container, Header, Icon } from 'semantic-ui-react'
import Search from '../src/components/search'
export default class Filter extends React.Component {
	render() {
		return (
			<Container>
				<Header as='h2'>
					<Icon name='plug' />
					<Header.Content>
						Quick search
    </Header.Content>
				</Header>
				<Search />
			</Container>
		)
	}
}