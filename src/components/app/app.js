import React, {Component} from 'react';
import {
		BrowserRouter as Router,
		Route,
		Switch,
		Redirect
} from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import ErrorButton from '../error-button';

import {
		PeoplePage,
		PlanetsPage,
		StarshipsPage,
		LoginPage,
		SecretPage
} from '../pages';

import {
		PersonDetails
} from "../sw-components/";

import { SwapiServiceProvider } from '../swapi-service-context';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import './app.css';

export default class App extends Component {
		
		state = {
				showRandomPlanet: true,
				selectedPerson: 5,
				swapi: new SwapiService(),
				isLoggedIn: false
		};
		
		onLogin = () => {
				this.setState({
						isLoggedIn: true
				})
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
				const planet = this.state.showRandomPlanet ?	<RandomPlanet updateInterval={5000} /> : null;
				
				return (
						<ErrorBoundry>
								<SwapiServiceProvider value={this.state.swapi} >
										<Router>
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
												<Switch>
														<Route
																path="/"
																render={() => <h2>Welcom starDb</h2>}
																exact
														/>
														
														{/*<Route
																path="/people"
																render={
																		() => <h2>Welcom PeoplePage</h2>
																}
														/>*/}
														<Route
																path="/people"
																exact
																component={PeoplePage}
														/>
														<Route
																path="/people/:id"
																render={
																		({match}) => {
																				const {id} = match.params;
																				return (<PersonDetails itemId={id} />)
																		}
																}
														
														/>
														<Route
																path="/planets/:id?"
																component={PlanetsPage}
														/>
														
														<Route
																path="/starships"
																component={StarshipsPage}
														/>
														
														<Route
																path="/login"
																render={
																		() => <LoginPage
																				isLoggedIn={this.state.isLoggedIn}
																				onLogin={this.onLogin}
																		/>
																}
														/>
														<Route
																path="/secret"
																render={
																		() => <SecretPage
																				isLoggedIn={this.state.isLoggedIn}
																		/>
																}
														/>
														{/*<Redirect to="/" />*/}
														<Route render={() => <h2>Page not found</h2>} />
												</Switch>
										</Router>
										
								</SwapiServiceProvider>
						</ErrorBoundry>
				);
		}
};