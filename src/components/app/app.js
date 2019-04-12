import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ErrorButton from '../error-button';
import ErrorBoundry from '../error-boundry';

import SwapiService from '../../services/swapi-service';

import './app.css';

export default class App extends Component {

		swapi = new SwapiService();

		state = {
				showRandomPlanet: true,
				selectedPerson: 5
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
				const planet = this.state.showRandomPlanet ?
						<RandomPlanet/> : null;
				return (
						<ErrorBoundry>
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
						</ErrorBoundry>
				);
		}
};