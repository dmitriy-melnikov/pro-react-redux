import React, {Component} from 'react';

import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import Row from '../row';
import ErrorBoundry from '../error-boundry';

import Swapiservice from '../../services/swapi-service';

import './people-page.css';

export default class PeoplePage extends Component {

		swapi = new Swapiservice();

		state = {
				selectedPerson: 5
		};

		onPersonSelected = (id) => {
				this.setState({
						selectedPerson: id
				})
		};

		render() {
				const itemList = (
						<ItemList
								onItemSelected={this.onPersonSelected}
								getData={this.swapi.getAllPeople}
						>
								{i => (`${i.name} (${i.birthYear})`)}
						</ItemList>
				);
				const personDetails = (
						<ErrorBoundry>
								<PersonDetails
										personId={this.state.selectedPerson}
								/>
						</ErrorBoundry>
				);
				return (
								<Row left={itemList} right={personDetails} />
				)
		}
}
