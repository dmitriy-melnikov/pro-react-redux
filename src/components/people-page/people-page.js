import React, {Component} from 'react';

import ItemList from '../item-list/item-list';
import ItemDetails from '../item-details/item-details';
import Row from '../row';
import ErrorBoundry from '../error-boundry';

import Swapiservice from '../../services/swapi-service';

import './people-page.css';

export default class PeoplePage extends Component {

		swapi = new Swapiservice();

		state = {
				selectedItem: 5
		};

		onItemSelected = (id) => {
				this.setState({
						selectedItem: id
				})
		};

		render() {
				const itemList = (
						<ItemList
								onItemSelected={this.onItemSelected}
								getData={this.swapi.getAllPeople}
						>
								{i => (`${i.name} (${i.birthYear})`)}
						</ItemList>
				);
				const itemDetails = (
						<ErrorBoundry>
								<ItemDetails
										itemId={this.state.selectedItem}
								/>
						</ErrorBoundry>
				);
				{/*<Row left={itemList} right={itemDetails} />*/}
				return (
								<Row left={itemList} />
				)
		}
}
