import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
//import PeoplePage from '../people-page';
import ErrorBoundry from '../error-boundry';
import Row from '../row';
import Record from '../record';

import {
		PersonList,
		PlanetList,
		StarshipList
} from '../sw-components';

import {
		PlanetDetails,
		PersonDetails,
		StarshipDetails
} from '../sw-components/';


import { SwapiServiceProvider } from '../swapi-service-context';
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
				this.setState({
						hasError: true
				})
		}
		
		render() {
				const planet = this.state.showRandomPlanet ?	<RandomPlanet/> : null;
				
				return (
						<ErrorBoundry>
								<SwapiServiceProvider value={this.swapi} >
										<Header/>
										
										{/*<PersonList/>
										<PlanetList/>
										<StarshipList/>*/}
										
										{/*	{planet}*/}
										
										{/*<div className="row mb2 button-row">
										<button
												className="toggle-planet btn btn-warning btn-lg"
												onClick={this.toggleRandomPlanet}>
												Toggle Random Planet
										</button>
										<ErrorButton />
								</div>*/}
										
										{/*<PeoplePage/>*/}
										
										<Row
												left={
														<PersonDetails itemId={this.state.selectedPerson} />
												}
												right={
														<PlanetDetails itemId={this.state.selectedPerson} />
												}
										/>
								</SwapiServiceProvider>
								
						</ErrorBoundry>
				);
		}
};