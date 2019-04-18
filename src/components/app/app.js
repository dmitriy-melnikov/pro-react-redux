import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import ErrorButton from '../error-button';

import {PeoplePage, PlanetsPage, StarshipsPage} from '../pages';



import { SwapiServiceProvider } from '../swapi-service-context';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import './app.css';

export default class App extends Component {
		
		state = {
				showRandomPlanet: true,
				selectedPerson: 5,
				swapi: new SwapiService()
		};
		
		toggleRandomPlanet = () => {
				this.setState((state) => {
						return {
								showRandomPlanet: !state.showRandomPlanet
						}
				});
		};
		
		onServiceChange = () => {
				this.setState(({swapi}) => {
								const Service = swapi instanceof SwapiService ?
										DummySwapiService :
										SwapiService;
								return {
										swapi: new Service()
								}
						}
				)
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
								<SwapiServiceProvider value={this.state.swapi} >
										<Header  onServiceChange={this.onServiceChange}/>
										{planet}
										<div className="row mb2 button-row">
												<button
														className="toggle-planet btn btn-warning btn-lg"
														onClick={this.toggleRandomPlanet}>
														Toggle Random Planet
												</button>
												<ErrorButton />
										</div>
									<PeoplePage />
								 <PlanetsPage />
									<StarshipsPage />
								</SwapiServiceProvider>
						</ErrorBoundry>
				);
		}
};