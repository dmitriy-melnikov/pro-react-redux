import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import ErrorIndicator from '../error-indicator/error-indicator';
import ErrorButton from '../error-button';

import Swapiservice from '../../services/swapi-service';

import './people-page.css';

export default class PeoplePage extends Component {

		swapi = new Swapiservice();

		state = {
				selectedPerson: 5,
				hasError: false
		};

		onPersonSelected = (id) => {
				this.setState({
						selectedPerson: id
				})
		};

		componentDidCatch(error, info) {
				//debugger;
				this.setState({
						hasError: true
				})
		}

		render() {
				if (this.state.hasError) {
						return <ErrorIndicator/>
				}

				return(
								<div className="row mb2">
										<div className="col-md-6">
												<ItemList
														onItemSelected={this.onPersonSelected}
														getData={this.swapi.getAllPeople}
												/>
										</div>
										<div className="col-md-6">
												<PersonDetails personId={this.state.selectedPerson}/>
										</div>
								</div>
						)
		}
}
