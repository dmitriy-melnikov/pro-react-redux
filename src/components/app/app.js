import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import Row from '../row';
import ItemDetails, { Record } from "../item-details/item-details";

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
				
				const {getPerson, getPlanet, getPersonImage, getPlanetImage} = this.swapi;
				
				const personDetails = (
						<ItemDetails
							itemId={9}
							getData={getPerson}
							getImageUrl={getPersonImage}
						>
								<Record field="gender" label="Gender" />
								<Record field="birthYear" label="Birth year" />
								<Record field="eyeColor" label="Eye color" />
						</ItemDetails>);
				const planetDetails = (
						<ItemDetails
								itemId={6}
								getData={getPlanet}
								getImageUrl={getPlanetImage}
						>
								<Record field="population" label="Population" />
								<Record field="rotationPeriod" label="Rotation period" />
								<Record field="diameter" label="Diameter" />
						</ItemDetails>);
				return (
						<ErrorBoundry>
								<Header/>
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
								
								<Row left={personDetails} right={planetDetails}/>
						</ErrorBoundry>
				);
		}
};