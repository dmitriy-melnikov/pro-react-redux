import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import ErrorButton from '../error-button';

import SwapiService from '../../services/swapi-service';

import './app.css';

export default class App extends Component {

		swapi = new SwapiService();

		state = {
				showRandomPlanet: true,
				selectedPerson: 5,
				hasError: false
		};

		toggleRandomPlanet = () => {
				this.setState((state) => {
						return {
								showRandomPlanet: !state.showRandomPlanet
						}
				});
		};

		componentDidCatch() {
				console.log('componentDidCatch()');
				this.setState({
						hasError: true
				})
		}

		render() {

				if (this.state.hasError) {
						return <ErrorIndicator/>
				}

				const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;
				return (
						<div>
								<Header/>
								{planet}

								<div className="row mb2 button-row">
										<button
												className="toggle-planet btn btn-warning btn-lg"
												onClick={this.toggleRandomPlanet}>
												Toggle Random Planet
										</button>
										<ErrorButton />
								</div>

								<PeoplePage/>

								<div className="row mb2">
										<div className="col-md-6">
												<ItemList
														onItemSelected={this.onPersonSelected}
														getData={this.swapi.getAllPlanets}
												/>
										</div>
										<div className="col-md-6">
												<PersonDetails personId={this.state.selectedPerson}/>
										</div>
								</div>

								<div className="row mb2">
										<div className="col-md-6">
												<ItemList
														onItemSelected={this.onPersonSelected}
														getData={this.swapi.getAllStarships}
												/>
										</div>
										<div className="col-md-6">
												<PersonDetails personId={this.state.selectedPerson}/>
										</div>
								</div>

						</div>
				);
		}

};