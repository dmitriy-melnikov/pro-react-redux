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
		StarshipDetails
} from '../sw-components/';

import personDetails from '../sw-components/person-details';

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
				
				/*const personDetails = (
						<PersonDetails
							itemId={9}
						>
								<Record field="gender" label="Gender" />
								<Record field="birthYear" label="Birth year" />
								<Record field="eyeColor" label="Eye color" />
						</PersonDetails>);*/
				const planetDetails = (
						<PlanetDetails
								itemId={6}
						>
								<Record field="population" label="Population" />
								<Record field="rotationPeriod" label="Rotation period" />
								<Record field="diameter" label="Diameter" />
						</PlanetDetails>);
				
				const starshipDetails = (
						<StarshipDetails
								itemId={9}
						>
								cargoCapacity: starship.cargo_capacity
								<Record field="model" label="Model" />
								<Record field="manufacturer" label="Manufacturer" />
								<Record field="costInCredits" label="Cost in credits" />
								<Record field="length" label="Length" />
								<Record field="crew" label="Crew" />
								<Record field="passengers" label="Passengers" />
								<Record field="cargoCapacity" label="Cargo capacity" />
						</StarshipDetails>);
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
										
										<Row left={personDetails}/>
								</SwapiServiceProvider>
								
						</ErrorBoundry>
				);
		}
};